import { Injectable } from '@angular/core';
import { Track } from './track.model';

@Injectable({
  providedIn: 'root',
})
export class AudioPlayerService {
  private audioObj = new Audio();
  private tracks: Track[] = [
    {
      name: 'Rihana',
      src: 'assets/music/Rihanna - We Found Love ft. Calvin Harris.mp3',
      title: 'We Found Love',
      cover: 'assets/images/img2.jpg',
    },
    {
      name: 'Justin Bieber',
      src: 'assets/music/DJ Snake - Let Me Love You ft. Justin Bieber.mp3',
      title: 'let Me Love You',
      cover: 'assets/images/img1.jpg',
    },
    {
      name: 'Justin Bieber',
      src: 'assets/music/DJ Snake - Let Me Love You ft. Justin Bieber.mp3',
      title: 'let Me Love You',
      cover: 'assets/images/img1.jpg',
    },
  ];
  private currentTrackIndex = 0;

  constructor() {}

  play() {
    const newSrc = this.tracks[this.currentTrackIndex].src;
    const currentSrc = new URL(this.audioObj.src, window.location.href).href;
    const newSrcAbsolute = new URL(newSrc, window.location.href).href;

    if (currentSrc !== newSrcAbsolute) {
      console.log('Updating src');
      this.audioObj.src = newSrc;
    }
    this.audioObj.play();
  }

  pause() {
    this.audioObj.pause();
  }

  stop() {
    this.pause();
    //this.audioObj.currentTime = 0;
  }

  nextTrack() {
    if (this.currentTrackIndex >= this.tracks.length - 1) {
      this.currentTrackIndex = 0;
    } else {
      this.currentTrackIndex++;
    }
    this.play();
  }

  previousTrack() {
    if (this.currentTrackIndex <= 0) {
      this.currentTrackIndex = this.tracks.length - 1;
    } else {
      this.currentTrackIndex--;
    }
    this.play();
  }

  seek(time: number) {
    this.audioObj.currentTime = time;
  }

  getCurrentTrack(): Track {
    return this.tracks[this.currentTrackIndex];
  }

  onLoadedMetadata(callback: () => void) {
    this.audioObj.addEventListener('loadedmetadata', callback);
  }

  getDuration(): number {
    return this.audioObj.duration;
  }

  getCurrentTime(): number {
    return this.audioObj.currentTime;
  }
}
