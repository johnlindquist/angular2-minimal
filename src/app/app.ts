import {Component} from '@angular/core';

@Component({
    selector: 'app',
    styles:[`
.completed{
    text-decoration: line-through;
}
`],
    template: `<div>

<input type="text" [(ngModel)]="message" (keyup.ENTER)="onEnter()">
{{message}}
<hr>

<ul>
    <li 
        *ngFor="let m of messages"
        [ngClass]="{'completed':m.completed}"
        (click)="m.completed = !m.completed"
        >{{m.message}}</li>
</ul>

</div>`
})
export class AppComponent {
    message = 'Amazing!';
    messages = [ ];

    onEnter(){
        this.messages.push(
            {
                message: this.message,
                completed: false
            }
        );
        this.message = "";
    }
}
