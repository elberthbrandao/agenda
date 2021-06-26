import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario: FormGroup;
  contatos: Contato[] = [];
  colunas: string[] = ['id', 'nome', 'email', 'favorito'];

  constructor(
    private contatoService: ContatoService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.montarFormulario();
    this.listarContatos();
  }

  montarFormulario() {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  listarContatos() {
    this.contatoService.list().subscribe(resposta => {
      this.contatos = resposta;
    })
  }

  favoritar(contato: Contato) {
    this.contatoService.favorite(contato).subscribe(response => {
      contato.favorito = !contato.favorito;
    })
  }

  submit() {
    const formValues = this.formulario.value;
    const contato: Contato = new Contato(formValues.nome, formValues.email);
    this.contatoService.save(contato).subscribe(resposta => {
      let lista: Contato[] = [...this.contatos, resposta];
      this.contatos = lista;
    });
  }

}
