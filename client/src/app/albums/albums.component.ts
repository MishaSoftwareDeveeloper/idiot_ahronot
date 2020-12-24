import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from "../services/backend.service";


@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
    @ViewChild('dv') dview;
    private tabs: Array<any> = [
            {
                title: 'Playlist',
                data:[]
            },
            {
                title: 'Artists',
                data: []
            },
            {
                title: 'Albums',
                data: []
            },
            {
                title: 'Songs',
                data: []
            },
            {
                title: 'Genes',
                data: []
            }
    ];
    private localAlbums: Array<any> = [
        {
            id: 0,
            image_path: 'assets/Images/Albums/anastase-maragos.jpg',
            title: 'Fisrt',
            artist_name: 'Anastase Maragos',
            genres:'Classic'
        },
        {
            id: 0,
            image_path: 'assets/Images/Albums/annie-spratt.jpg',
            title: 'Unique',
            artist_name: 'Annie Spratt',
            genres: 'Classic'
        },
        {
            id: 0,
            image_path: 'assets/Images/Albums/concert.jpg',
            title: 'Concert',
            artist_name: 'Festival',
            genres: 'Electric'
        },
        {
            id: 0,
            image_path: 'assets/Images/Albums/guitar.jpg',
            title: 'Guitar',
            artist_name: 'Artists guitar',
            genres: 'Pop'
        },
        {
            id: 0,
            image_path: 'assets/Images/Albums/guitar2.jpg',
            title: 'Guitar second',
            artist_name: 'Artists guitar',
            genres: 'Pop'
        },
        {
            id: 0,
            image_path: 'assets/Images/Albums/ivan-dorofeev.jpg',
            title: 'Art',
            artist_name: 'Ivan Dorofeev',
            genres: 'Classic'
        },
        {
            id: 0,
            image_path: 'assets/Images/Albums/jaclyn-moy.jpg',
            title: 'Best',
            artist_name: 'Jaclyn Moy',
            genres: 'Rock'
        },
        {
            id: 0,
            image_path: 'assets/Images/Albums/mic.jpg',
            title: 'Top',
            artist_name: 'Eden',
            genres: 'Jaz'
        },
        {
            id: 0,
            image_path: 'assets/Images/Albums/microphone.jpg',
            title: 'Childrens',
            artist_name: 'Boys',
            genres: 'Pop'
        },
        {
            id: 0,
            image_path: 'assets/Images/Albums/music.jpg',
            title: 'Concert',
            artist_name: 'Only Tops',
            genres: 'Pop'
        },
        {
            id: 0,
            image_path: 'assets/Images/Albums/musician.jpg',
            title: 'Musician',
            artist_name: 'musician',
            genres: 'Bards'
        }

    ];
    private searchData:string='';
    private displayModal: boolean = false;
    private showDataView: boolean = true;
    private albums: Array<any> = [];
    private uploadedFile:null;
    private selectedAlbum: any;
    private user: any;
   
    constructor(private router: Router, private api: BackendService) { }

    ngOnInit(): void {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        if (!this.user)
            this.router.navigate(['/login'])
        this.api.get(`albums/${this.user.id}`).subscribe((albums: any) => {
            this.bindChanges(albums);
        })
       
    }
  onLogout() {
      sessionStorage.clear();
      this.router.navigate(['/login']);
    }

  onAddAlbum(album) {
      this.albums.push(album);
     
  }
  bindChanges(albums) {
      this.albums = albums;
      this.showDataView = false;
      this.dview.value = albums;
      setTimeout(() => this.showDataView = true, 100);
      this.user.Albums = albums;
      sessionStorage.setItem('user', JSON.stringify(this.user));
  }
  onHideModal() {
  
      this.api.addAlbum(this.user.id, this.albums).subscribe((albums: any) => {
          this.bindChanges(albums);
      })

  }
  onDelete(albumId: number) {
      this.api.delete('albums', albumId).subscribe((album: any) => {
        
          var albums = this.albums.filter((a) => { return a.id != albumId });
          this.bindChanges(albums);
      })
  }

}
