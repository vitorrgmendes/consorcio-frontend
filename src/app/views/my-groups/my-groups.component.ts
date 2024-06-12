import { Component, OnInit } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { CardGroupsConsortiumComponent } from '../../components/card-groups-consortium/card-groups-consortium.component';
import { HeaderDetailsGroupComponent } from '../../components/header-details-group/header-details-group.component';
import { HeaderMyGroupsComponent } from "../../components/header-my-groups/header-my-groups.component";
import { MatDialog } from '@angular/material/dialog';
import { ModalIdGrupoComponent } from '../../components/modal-id-grupo/modal-id-grupo.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';

interface Group {
  max_price: number;
  title: string;
  totalCreditos: string;
  valorParcelas: string;
  totalParcelas: string;
  backgroundColor: string;
}
@Component({
    selector: 'app-my-groups',
    standalone: true,
    templateUrl: './my-groups.component.html',
    styleUrl: './my-groups.component.css',
    imports: [BannerComponent, CardGroupsConsortiumComponent, HeaderDetailsGroupComponent, HeaderMyGroupsComponent, MatButtonModule, MatIconModule, MatMenuModule, MatButtonToggleModule, CommonModule, RouterLink, RouterLinkActive, MatTooltipModule, FormsModule, ReactiveFormsModule]
})
export class MyGroupsComponent implements OnInit {
  filterCategoryControl = new FormControl('');
  filterCategory: string = 'all';
  groups: Group[] = [
    { max_price: 1000, title: "Consórcio Juntos", totalCreditos: "R$ 1.000,00", valorParcelas: "R$ 100,00", totalParcelas: "10", backgroundColor: "#C0C0C0" },
    { max_price: 10000, title: "Consórcio da Galera", totalCreditos: "R$ 10.000,00", valorParcelas: "R$ 500,00", totalParcelas: "20", backgroundColor: "#C0C0C0" },
    { max_price: 500, title: "Grupo de Poupança Coletiva", totalCreditos: "R$ 500,00", valorParcelas: "R$ 100,00", totalParcelas: "5", backgroundColor: "#C0C0C0" }
  ];
  filteredGroups: Group[] = [];

  ngOnInit() {
    this.filterCategory = 'all';
    this.filteredGroups = this.groups;
    this.filterCategoryControl.valueChanges.subscribe(value => this.filterGroups(value!));
  }

  constructor(public dialog: MatDialog) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ModalIdGrupoComponent, {
      width: '580px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  filterGroups(category: string): void {
    if (category === 'all') {
      this.filteredGroups = this.groups;
    } else {
      const maxPrice = parseInt(category, 10);
      this.filteredGroups = this.groups.filter(group => group.max_price <= maxPrice);
    }
  }
}
