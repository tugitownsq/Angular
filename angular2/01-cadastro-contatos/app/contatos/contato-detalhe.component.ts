import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ContatoService } from './contato.service';
import { Contato } from './contato.model';


@Component({
    moduleId: module.id,
    selector: 'contato-detalhe',
    templateUrl: 'contato-detalhe.component.html',
    styleUrls: ['contato-detalhe.component.css']
})

export class ContatoDetalheComponent implements OnInit {

    contato: Contato;
    private isNew: boolean = true;

    constructor(
        private contatoService: ContatoService,
        private route: ActivatedRoute,
        private location: Location
    ){}

    ngOnInit(): void {
        this.contato = new Contato(0, '', '', '');
        this.route.params.forEach((params:Params) => {
            let id: number = +params['id'];

            if(id){

                this.isNew = false;

                this.contatoService.getContato(id)
                .then((contato: Contato) => {
                    this.contato = contato;
                });
            }            
        });
    }

    onSubmit(): void {
        let promise;


        if(this.isNew){
            console.log('Cadastrar contato');
            promise = this.contatoService.create(this.contato);
        } else{
            console.log('Alterar contato');
            promise = this.contatoService.update(this.contato);
        }

        promise.then(contato => this.location.back());
    }
}