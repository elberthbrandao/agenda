import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  constructor(
    private contatoService: ContatoService
  ) { }

  ngOnInit(): void {
    const c: Contato = new Contato();
    c.nome = "Elberth";
    c.email = "elberth@gmail.com";
    c.favorito = true;
    console.log('iniciado')
    this.contatoService.save(c).subscribe(resposta => {
      console.log(resposta)
    });
  }

}
