import { Component, OnInit } from '@angular/core';
import { AudioPlayerService } from '../music-player.service';
import { Track } from '../track.model';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css'],
})
export class AudioPlayerComponent implements OnInit {
  currentTrack: Track | null = null;
  isPlaying = false;
  songName: string | undefined;
  currentProgress = 0;
  trackDuration = 0;
  progress = 0;

  constructor(private audioService: AudioPlayerService) {}

  ngOnInit() {
    this.loadCurrentTrack();
  }

  loadCurrentTrack() {
    this.currentTrack = this.audioService.getCurrentTrack();
    this.audioService.onLoadedMetadata(() => {
      this.trackDuration = this.audioService.getDuration();
      this.startProgressUpdate();
    });
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.audioService.pause();
    } else {
      this.audioService.play();
      this.startProgressUpdate();
    }
    this.isPlaying = !this.isPlaying;
  }

  stop() {
    this.audioService.stop();
    this.isPlaying = false;
    this.currentProgress = 0;
  }

  nextTrack() {
    this.audioService.nextTrack();
    this.loadCurrentTrack();
    if (!this.isPlaying) {
      this.togglePlayPause();
    }
  }

  previousTrack() {
    this.audioService.previousTrack();
    this.loadCurrentTrack();
    if (!this.isPlaying) {
      this.togglePlayPause();
    }
  }

  seekTo(event: MouseEvent) {
    const progressContainer = (event.target as HTMLElement).closest(
      '.progress-container'
    );
    if (!progressContainer) return;

    const bounds = progressContainer.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const percentage = x / bounds.width;
    const seekTime = percentage * this.trackDuration;

    this.audioService.seek(seekTime);
  }

  private startProgressUpdate() {
    const updateProgress = () => {
      this.progress =
        (this.audioService.getCurrentTime() / this.trackDuration) * 100;
      if (this.isPlaying) {
        requestAnimationFrame(updateProgress);
      }
    };
    requestAnimationFrame(updateProgress);
  }
}
