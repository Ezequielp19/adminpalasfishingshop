import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SomosService } from 'src/app/services/quienesSomos.service';
import { AlertController } from '@ionic/angular';
import { somos } from 'src/app/models/quienesSomos';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quienesSomo',
  templateUrl: './quienesSomo.component.html',
  styleUrls: ['./quienesSomo.component.scss'],
})
export class SomoComponent implements OnInit {
  listSomos: any;

   somos: any[]= [];

       apiUrl: string = environment.apiUrl;


  constructor(private router: Router, private somosService: SomosService,
    private alertCtrl: AlertController) {}

  ngOnInit(): void {
    this.obtenerSomos();
  }

  obtenerSomos() {
    this.somosService.getSomos().subscribe(data => {
      console.log(data);
      this.listSomos = data;
    });
  }

  eliminarSomos(id: string) {
    this.somosService.eliminarSomos(id).subscribe(() => {
      this.mostrarAlerta()
      this.obtenerSomos();
    });
  }


  async mostrarAlerta() {
    const alert = await this.alertCtrl.create({
      header: 'Eliminado correctamente',
      message: 'Eliminado exitosamente.',
      buttons: ['OK']
    });

    await alert.present();
  }



  goBack() {
    window.history.back();
  }

  navigateToPage1() {
    this.router.navigate(['/home']); //
  }

  navigateToPage3() {
    this.router.navigate(['/product']); //
  }

  navigateToPage4() {
    this.router.navigate(['/productoNuevo']); //
  }

  navigateToPage5() {
    this.router.navigate(['/event']); //
  }
  navigateToPage6() {
    this.router.navigate(['/lotery']); //
  }
  navigateToPage7() {
    this.router.navigate(['/categoria']); //
  }
  navigateToPage8() {
    this.router.navigate(['/qSomos']); //
  }
}
