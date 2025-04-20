import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { FormComponent } from '../../models/form-component.model';


@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule],
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
})
export class BuilderComponent {
  selectedIndex: number | null = null;
  selectedComponent: FormComponent | null = null;
  toolbox = [
    {
      category: 'Layout',
      items: [
        { type: 'header', label: 'Header', icon: '🧱' },
        { type: 'footer', label: 'Footer', icon: '🧱' },
        { type: 'carousel', label: 'Carrossel', icon: '🎞️' },
      ]
    },
    {
      category: 'Campos',
      items: [
        { type: 'input', label: 'Input', placeholder: 'Digite algo...', icon: '🔤' },
        { type: 'textarea', label: 'Textarea', placeholder: 'Texto grande...', icon: '📝' },
        { type: 'checkbox', label: 'Checkbox', labelAlt: 'Aceito os termos', icon: '☑️' },
        { type: 'button', label: 'Botão', icon: '🔘' },
      ]
    },
    {
      category: 'Mídia',
      items: [
        { type: 'image', label: 'Imagem', icon: '🖼️' },
      ]
    }
  ];

  canvas: FormComponent[] = [];

  drop(event: CdkDragDrop<any>) {
    const item = event.item.data;
  
    const newComponent: FormComponent = {
      id: crypto.randomUUID(),
      type: item.type,
      label: item.label || '',
      placeholder: item.placeholder || '',
      value: item.value || '',
      slides: item.slides || [] // só se for carousel
    };
  
    // Verifica se é arraste de fora (toolbox) para o canvas
    const isFromToolbox = !event.previousContainer || event.previousContainer.id !== event.container.id;
  
    if (isFromToolbox) {
      // Insere no índice exato onde o item foi solto
      this.canvas.splice(event.currentIndex, 0, newComponent);
    } else {
      // Reordenação dentro do canvas (caso queira isso também)
      moveItemInArray(this.canvas, event.previousIndex, event.currentIndex);
    }

    console.log('Item arrastado:', this.canvas);
    
  }

  selectComponent(index: number) {
    this.selectedIndex = index;
  }

  removeComponent(index: number) {
    this.canvas.splice(index, 1);

    // Se o item removido era o selecionado, limpa a seleção
    if (this.selectedIndex === index) {
      this.selectedIndex = null;
    } else if (this.selectedIndex && this.selectedIndex > index) {
      this.selectedIndex--; // ajusta seleção se necessário
    }
  }



  openModal(index: number) {
    this.selectedComponent = { ...this.canvas[index] };
    this.selectedIndex = index;

    if (this.selectedComponent.type === 'carousel' && !this.selectedComponent.slides) {
      this.selectedComponent.slides = [];
    }
  }

  closeModal() {
    this.selectedComponent = null;
  }

  saveChanges() {
    if (this.selectedIndex !== null && this.selectedComponent) {
      // Copia os dados modificados de volta
      this.canvas[this.selectedIndex] = {
        ...this.canvas[this.selectedIndex],
        ...this.selectedComponent,
      };

      this.selectedComponent = null;
      this.selectedIndex = null;
    }
  }

  modalTab: 'edit' | 'actions' = 'edit';

  setModalTab(tab: 'edit' | 'actions') {
    this.modalTab = tab;
  }

  addCarouselSlide() {
    if (this.selectedComponent && this.selectedComponent.slides && this.selectedComponent?.type === 'carousel') {
      this.selectedComponent.slides.push({
        url: 'https://via.placeholder.com/300x150',
        title: 'Novo Slide'
      });
    }
  }

  previewVisible = false;

  openPreview() {
    this.previewVisible = true;
  }

  closePreview() {
    this.previewVisible = false;
  }
}
