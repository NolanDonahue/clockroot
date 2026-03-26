import { Pipe, PipeTransform, inject } from '@angular/core';
import { RendererService } from './renderer.service';
@Pipe({ name: 'format', standalone: true })
export class FormatPipe implements PipeTransform {
  private rendererService = inject(RendererService);

  transform(value: string): string {
    return this.rendererService.formatString(value);
  }
}
