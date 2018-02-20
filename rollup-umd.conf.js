export default {
  input: '.packaging/esm5/francette.js',
  output: {
    file: 'builds/bundles/francette.umd.js',
    format: 'umd',
    name: 'francette',
    globals: {
      '@angular/core': 'ng.core',
      '@angular/forms': 'ng.forms',
      '@angular/common': 'ng.common',
      '@angular/router': 'ng.router',
      '@angular/animations': 'ng.animations',
      '@angular/platform-browser/animations': 'ng.pf.animations',
      'rxjs/Observable': 'rxjs_Observable',
      'rxjs/Observer': 'rxjs_Observer',
      'rxjs/ReplaySubject': 'rxjs_ReplaySubject',
      'rxjs/observable/timer': 'rxjs_Observable_timer',
      'rxjs/add/operator/debounceTime': 'rxjs_debounce_time'
    }
  }
};
