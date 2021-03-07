import { Component, Input, OnInit } from '@angular/core';

const DEFAULT_RIPPLE_SIZE = 24;
const DEFAULT_RIPPLE_COLOR = 'rgba(0, 0, 0, 0.25)';
const DEFAULT_RIPPLE_DURATION = 2000;

@Component({
  selector: 'fr-progress-ripple',
  template: `
<div class="fr-progress-ripple-container" [style]="containerStyle">
  <div class="fr-progress-ripple-effect fr-progress-ripple-effect--first" [style]="rippleStyle.first"></div>
  <div class="fr-progress-ripple-effect fr-progress-ripple-effect--second" [style]="rippleStyle.second"></div>
</div>
  `,
  styles: [`
    .fr-progress-ripple-container {
      position: relative;
      overflow: hidden;
    }
    .fr-progress-ripple-effect {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      background-color: ${DEFAULT_RIPPLE_COLOR};
      border-radius: 50%;
      opacity: 0;
      transform: scale(0);
      animation-name: ripple;
      animation-duration: ${DEFAULT_RIPPLE_DURATION}ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
    .fr-progress-ripple-effect--second {
      animation-delay: ${DEFAULT_RIPPLE_DURATION / 2}ms;
    }
    @keyframes ripple {
      0% {
        opacity: 1;
        transform: scale(0);
      }
      100% {
        opacity: 0;
        transform: scale(1);
      }
    }
  `],
})
export class FrProgressRippleComponent implements OnInit {
  @Input() size: number = DEFAULT_RIPPLE_SIZE;
  @Input() color: string = DEFAULT_RIPPLE_COLOR;
  @Input() duration: number = DEFAULT_RIPPLE_DURATION;

  public containerStyle: Record<string, any>;
  public rippleStyle: { first: any, second: any };

  constructor() {
    this.containerStyle = {
      width: `${DEFAULT_RIPPLE_SIZE}px`,
      height: `${DEFAULT_RIPPLE_SIZE}px`,
    };
    this.rippleStyle = {
      first: {
        backgroundColor: DEFAULT_RIPPLE_COLOR,
        animationDuration: DEFAULT_RIPPLE_DURATION,
        animationDelay: 0,
      },
      second: {
        backgroundColor: DEFAULT_RIPPLE_COLOR,
        animationDuration: DEFAULT_RIPPLE_DURATION,
        animationDelay: DEFAULT_RIPPLE_DURATION / 2,
      }
    };
  }

  ngOnInit() {
    this.containerStyle = {
      width: `${this.size}px`,
      height: `${this.size}px`,
    };
    this.rippleStyle = {
      first: {
        backgroundColor: this.color,
        animationDuration: `${this.duration}ms`,
        animationDelay: 0,
      },
      second: {
        backgroundColor: this.color,
        animationDuration: `${this.duration}ms`,
        animationDelay: `${this.duration / 2}ms`,
      }
    };
  }
}
