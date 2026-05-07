/**
 * WeChat Article Formatter
 * Converts Markdown to WeChat Official Account compatible HTML
 */

import { marked } from 'marked';

interface StyleMapping {
  [key: string]: string;
}

interface ThemeBlock {
  [key: string]: Record<string, string>;
}

interface Theme {
  BASE: Record<string, string>;
  block: ThemeBlock;
  inline: Record<string, Record<string, string>>;
}

const defaultTheme: Theme = {
  BASE: {
    'text-align': 'left',
    'color': '#3f3f3f',
    'line-height': '1.5'
  },
  block: {
    h2: {
      'font-size': '140%',
      'text-align': 'center',
      'font-weight': 'normal',
      'margin': '80px 10px 40px 10px'
    },
    h3: {
      'font-weight': 'bold',
      'font-size': '120%',
      'margin': '40px 10px 20px 10px'
    },
    p: {
      'margin': '10px 10px',
      'line-height': '1.6'
    },
    blockquote: {
      'color': 'rgb(91, 91, 91)',
      'padding': '1px 0 1px 10px',
      'background': 'rgba(158, 158, 158, 0.1)',
      'border-left': '3px solid rgb(158,158,158)'
    },
    code: {
      'font-size': '80%',
      'overflow': 'auto',
      'color': '#333',
      'background': 'rgb(247, 247, 247)',
      'border-radius': '2px',
      'padding': '10px',
      'line-height': '1.3',
      'border': '1px solid rgb(236,236,236)',
      'margin': '20px 0'
    },
    image: {
      'border-radius': '4px',
      'display': 'block',
      'margin': '20px auto',
      'width': '100%'
    },
    ol: {
      'margin-left': '0',
      'padding-left': '20px'
    },
    ul: {
      'margin-left': '0',
      'padding-left': '20px',
      'list-style': 'circle'
    },
    footnotes: {
      'margin': '10px 10px',
      'font-size': '14px'
    }
  },
  inline: {
    listitem: {
      'text-indent': '-20px',
      'display': 'block',
      'margin': '10px 10px'
    },
    codespan: {
      'font-size': '90%',
      'color': '#ff3502',
      'background': '#f8f5ec',
      'padding': '3px 5px',
      'border-radius': '2px'
    },
    link: {
      'color': '#ff3502'
    },
    strong: {
      'color': '#ff3502'
    },
    table: {
      'border-collapse': 'collapse',
      'margin': '20px 0'
    },
    thead: {
      'background': 'rgba(0,0,0,0.05)'
    },
    td: {
      'font-size': '80%',
      'border': '1px solid #dfdfdf',
      'padding': '4px 8px'
    }
  }
};

export interface WechatFormatOptions {
  fontFamily?: string;
  fontSize?: string;
  theme?: Theme;
}

export class WechatFormatter {
  private opts: WechatFormatOptions;
  private footnotes: [number, string, string][] = [];
  private footnoteIndex = 0;
  private styleMapping: Record<string, Record<string, string>> = {};

  constructor(opts: WechatFormatOptions = {}) {
    this.opts = {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: '16px',
      theme: defaultTheme,
      ...opts
    };
  }

  private buildStyleMapping(theme: Theme): Record<string, Record<string, string>> {
    const base = { ...theme.BASE, 'font-family': this.opts.fontFamily, 'font-size': this.opts.fontSize };
    const baseBlock = { ...base, margin: '20px 10px' };
    const mapping: Record<string, Record<string, string>> = {};

    for (const [ele, style] of Object.entries(theme.inline || {})) {
      mapping[ele] = { ...base, ...style };
    }
    for (const [ele, style] of Object.entries(theme.block || {})) {
      mapping[ele] = { ...baseBlock, ...style };
    }
    return mapping;
  }

  private styleAttr(tokenName: string): string {
    const dict = this.styleMapping[tokenName];
    if (!dict) return '';
    return 'style="' + Object.entries(dict).map(([k, v]) => `${k}:${v}`).join(';') + '"';
  }

  private addFootnote(title: string, link: string): number {
    this.footnoteIndex++;
    this.footnotes.push([this.footnoteIndex, title, link]);
    return this.footnoteIndex;
  }

  public render(markdown: string): string {
    this.footnotes = [];
    this.footnoteIndex = 0;
    this.styleMapping = this.buildStyleMapping(this.opts.theme!);

    const renderer = new marked.Renderer();

    renderer.heading = (text: string, level: number) => {
      const tag = level < 3 ? 'h2' : 'h3';
      return `<${tag} ${this.styleAttr(tag)}>${text}</${tag}>`;
    };

    renderer.paragraph = (text: string) => `<p ${this.styleAttr('p')}>${text}</p>`;

    renderer.blockquote = (text: string) => `<blockquote ${this.styleAttr('blockquote')}>${text}</blockquote>`;

    renderer.code = (text: string, lang?: string) => {
      const safeText = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const lines = safeText.split('\n');
      const codeLines = lines.map(line => 
        `<code><span class="code-snippet_outer">${line || '<br>'}</span></code>`
      ).join('');
      const numbers = lines.map(() => '<li></li>').join('');
      const language = lang || '';
      return `<section class="code-snippet__fix code-snippet__js">
        <ul class="code-snippet__line-index code-snippet__js">${numbers}</ul>
        <pre class="code-snippet__js" data-lang="${language}">${codeLines}</pre></section>`;
    };

    renderer.codespan = (text: string) => `<code ${this.styleAttr('codespan')}>${text}</code>`;

    renderer.listitem = (text: string) => 
      `<span ${this.styleAttr('listitem')}><span style="margin-right:10px"><%s/></span>${text}</span>`;

    renderer.list = (text: string, ordered: boolean) => {
      const segments = text.split('<%s/>');
      if (!ordered) {
        return `<p ${this.styleAttr('ul')}>${segments.join('•')}</p>`;
      }
      let result = segments[0];
      for (let i = 1; i < segments.length; i++) {
        result += `${i}.${segments[i]}`;
      }
      return `<p ${this.styleAttr('ol')}>${result}</p>`;
    };

    renderer.image = (href: string, title: string | null, text: string) =>
      `<img ${this.styleAttr('image')} src="${href}" title="${title || ''}" alt="${text}"/>`;

    renderer.link = (href: string, title: string | null, text: string) => {
      if (href.startsWith('https://mp.weixin.qq.com')) {
        return `<a href="${href}" title="${title || text}" ${this.styleAttr('link')}>${text}</a>`;
      }
      if (href === text) return text;
      const ref = this.addFootnote(title || text, href);
      return `<span ${this.styleAttr('link')}>${text}<sup>[${ref}]</sup></span>`;
    };

    renderer.strong = (text: string) => `<strong ${this.styleAttr('strong')}>${text}</strong>`;
    renderer.em = renderer.strong;

    renderer.table = (header: string, body: string) =>
      `<table ${this.styleAttr('table')}><thead ${this.styleAttr('thead')}>${header}</thead><tbody>${body}</tbody></table>`;

    renderer.tablerow = (text: string) => `<tr>${text}</tr>`;

    renderer.tablecell = (text: string, flags: { header?: boolean; align?: string }) =>
      `<td ${this.styleAttr('td')}>${text}</td>`;

    renderer.hr = () => '<hr style="border-style:solid;border-width:1px 0 0;border-color:rgba(0,0,0,0.1);transform:scale(1,0.5);transform-origin:0 0">';

    marked.setOptions({ renderer });
    let html = marked.parse(markdown) as string;

    if (this.footnotes.length > 0) {
      const footnoteHtml = this.footnotes.map(([idx, title, link]) => {
        if (title === link) {
          return `<code style="font-size:90%;opacity:0.6;">[${idx}]</code>: <i>${title}</i><br/>`;
        }
        return `<code style="font-size:90%;opacity:0.6;">[${idx}]</code> ${title}: <i>${link}</i><br/>`;
      }).join('\n');
      html += `<h3 ${this.styleAttr('h3')}>References</h3><p ${this.styleAttr('footnotes')}>${footnoteHtml}</p>`;
    }

    return html;
  }
}

export function toWechatHtml(markdown: string, opts?: WechatFormatOptions): string {
  return new WechatFormatter(opts).render(markdown);
}
