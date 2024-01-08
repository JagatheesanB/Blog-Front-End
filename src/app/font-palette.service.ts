import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FontPaletteService {
  fontFamily: string = 'Arial, sans-serif';
  fontSize: string = '16px';
  fontWeight: string = 'normal';
  fontStyle: string = 'normal';
}
