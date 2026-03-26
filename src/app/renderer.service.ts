import { Injectable } from '@angular/core';

import { marked, Renderer, Tokens } from 'marked';

@Injectable({
  providedIn: 'root',
})
export class RendererService {
  private renderer: Renderer;

  constructor() {
    this.renderer = this.getCustomRenderer();
  }

  private getCustomRenderer(): Renderer {
    const renderer = new Renderer();

    renderer.strong = function ({ tokens }: Tokens.Strong): string {
      const text = this.parser.parseInline(tokens);

      if (text.includes(':')) {
        const [type, subtype] = text.split(':');
        return `<img src="assets/inicon/${type}-${subtype}.png" class="inline-icon" />`;
      }
      return `<strong>${text}</strong>`;
    };

    renderer.paragraph = function ({ tokens }: Tokens.Paragraph): string {
      const text = this.parser.parseInline(tokens);

      return `<span class="paragraph">${text}</span>`;
    };

    return renderer;
  }

  public formatString(str: string): string {
    if (!str) {
      return '';
    }
    return marked(str, { renderer: this.renderer, async: false }) as string;
  }
}
