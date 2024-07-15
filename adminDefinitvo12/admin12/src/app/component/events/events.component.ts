import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular'; 
import { EventoService } from 'src/app/services/evento.service'
import { event } from 'src/app/models/evento'
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  fotoPerfil: File | null = null; 
  eventForm: FormGroup;

  goBack() {
    window.history.back();
  }

  titulo = 'Crear Evento';
  id: string | null;
  constructor(private fb: FormBuilder,
              private router: Router,
              private alertCtrl: AlertController,
              private _eventoService: EventoService,
              private aRouter: ActivatedRoute){
    this.eventForm = this.fb.group({
      imagen: ['', Validators.required],
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.esEditar();
  }

  // agregarEvento(){
    
  //   const EVENT: event= {
  //     imagen: this.eventForm.get('imagen')?.value,
  //     nombre: this.eventForm.get('nombre')?.value,
  //     fecha: this.eventForm.get('fecha')?.value,
  //     descripcion: this.eventForm.get('descripcion')?.value,
  //   }

  //   if(this.id!==null){
  //     // editamos producto
  //     this._eventoService.editarEvento(this.id, EVENT).subscribe(data=>{
  //       this.router.navigate(['/']);    
  //     })
  //   } else {
  //     // agregamos producto
  //     console.log(EVENT);
  //     this._eventoService.guardarEvento(EVENT).subscribe(data =>{
  //     this.router.navigate(['/']);
  //   })
  //   }
  // }

  onFileSelected(event: any): void {
    this.fotoPerfil = event.target.files[0] as File;
  }

  agregarEvento(): void {
    const nombre = this.eventForm.get('nombre')?.value;
    const fecha = this.eventForm.get('fecha')?.value;
    const descripcion = this.eventForm.get('descripcion')?.value;
    if (nombre && this.fotoPerfil && fecha && descripcion) {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('imagen', this.fotoPerfil);
      formData.append('fecha', fecha);
      formData.append('descripcion', descripcion);

      console.log('FormData:', formData);

      this._eventoService.createEventoWithImage(formData).subscribe({
        next: (response) => {
          console.log('Evento creada correctamente:', response);
          this.mostrarAlerta();
          this.router.navigate(['/event']);
        },
        error: (err) => {
          console.error('Error al crear el evento:', err);
          // Manejar el error según sea necesario
        }
      });
    }
  }

   async mostrarAlerta() {
    const alert = await this.alertCtrl.create({
      header: 'Agregado correctamente',
      message: 'El evento ha sido agregado exitosamente.',
      buttons: ['OK']
    });

    await alert.present();
  }
  
  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar Evento';
      this._eventoService.obtenerEvento(this.id).subscribe(data =>{
        this.eventForm.setValue({
          imagen: data.imagen,
          nombre: data.nombre,
          fecha: data.fecha,
          descripcion: data.descripcion,
        })
      })
    }
  }

}
