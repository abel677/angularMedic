import { Component } from '@angular/core';

@Component({
  selector: 'my-table-responsive',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  data: any[] = [
    {
      name: 'Abel Andrade',
      doctor: 'Juan Alcívar',
      dateA: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      dateB: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      state: true,
      observation: '...',
    },
    {
      name: 'Abel Andrade',
      doctor: 'Juan Alcívar',
      dateA: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      dateB: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      state: true,
      observation: '...',
    },
    {
      name: 'Abel Andrade',
      doctor: 'Juan Alcívar',
      dateA: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      dateB: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      state: true,
      observation: '...',
    },
    {
      name: 'Abel Andrade',
      doctor: 'Juan Alcívar',
      dateA: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      dateB: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      state: true,
      observation: '...',
    },
    {
      name: 'Abel Andrade',
      doctor: 'Juan Alcívar',
      dateA: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      dateB: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      state: true,
      observation: '...',
    },
    {
      name: 'Abel Andrade',
      doctor: 'Juan Alcívar',
      dateA: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      dateB: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      state: true,
      observation: '...',
    },
    {
      name: 'Abel Andrade',
      doctor: 'Juan Alcívar',
      dateA: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      dateB: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      state: true,
      observation: '...',
    },
    {
      name: 'Abel Andrade',
      doctor: 'Juan Alcívar',
      dateA: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      dateB: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      state: true,
      observation: '...',
    },
  ];
}
