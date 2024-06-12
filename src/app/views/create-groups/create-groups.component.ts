import { Component, OnInit } from '@angular/core';
import { HeaderDetailsGroupComponent } from "../../components/header-details-group/header-details-group.component";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
//import moment from 'moment';

@Component({
  selector: 'app-create-groups',
  standalone: true,
  templateUrl: './create-groups.component.html',
  styleUrl: './create-groups.component.css',
  imports: [HeaderDetailsGroupComponent, MatInputModule, MatFormFieldModule,
    MatSlideToggleModule,MatButtonModule, MatIconModule, MatTooltipModule, RouterLink, RouterLinkActive,
  CommonModule, FormsModule, ReactiveFormsModule ]
})
export class CreateGroupsComponent implements OnInit {
  
  groupForm: FormGroup ;
  
  constructor(private fb: FormBuilder, private apiService: ApiService,private userService: UserService,private router: Router) {
    this.groupForm = this.fb.group({
      nomeGrupo: ['', Validators.required],
      valorParcelas: [0, [Validators.required, Validators.min(1)]],
      valorCreditos: [0, [Validators.required, Validators.min(1)]],
      quantidadePessoas: [0, [Validators.required, Validators.min(1)]],
      privado: [false],
      idUser: [0], 
    });
  }

  ngOnInit(): void {
    
  }

criarGrupo() {
  if (this.groupForm.valid) {
    let groupData = this.groupForm.value;
    let dataCriacao = new Date();

    let quantidadeParcelas = groupData.quantidadePessoas;

    let dataFinal = new Date(dataCriacao.getTime());
    dataFinal.setMonth(dataCriacao.getMonth() + quantidadeParcelas);

    //const dataFinal = dataCriacao.clone().add(quantidadeParcelas, 'months').toDate();
    groupData.dataCriacao = dataCriacao;
    groupData.dataFinal = dataFinal;
    groupData.duracaoMeses = quantidadeParcelas;
    groupData.name = groupData.nomeGrupo; 
    groupData.valorTotal = groupData.valorCreditos; 
    groupData.meses = groupData.quantidadePessoas;

    // Obtém o usuário logado
    let user = this.userService.getUser();

    // Verifica se tem usuário logado
    if (user === undefined){this.router.navigate(['/login']);}

    this.apiService.postGroup(user.id!, groupData).subscribe(
      response => {
        console.log('Grupo criado com sucesso:', response);
      },
      error => {
        console.error('Erro ao criar grupo:', error);
      }
    );
  } else {
    console.log('Formulário inválido', this.groupForm);
  }
}


openExternalLink(): void {
  window.open('https://wa.me/5562981687434', '_blank');
}

  
}
