import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FrDialogContext, FrDialogService } from './dialog.service';
import { ComponentFactoryResolver } from '@angular/core';

describe('FrDialogContext', () => {
  let dialogContext: FrDialogContext<any>;

  it ('should create', () => {
    const onNext = () => {};
    const onError = () => {};
    const onComplete = () => {};
    dialogContext = new FrDialogContext(onNext, onError, onComplete);
    expect(dialogContext).toBeTruthy();
  });

  it ('should execute onNext', () => {
    const onNext = (value) => {
      expect(value).toBe('dummy value');
    };
    dialogContext = new FrDialogContext(onNext, null, null);
    dialogContext.next('dummy value');
  });

  it ('should execute onError', () => {
    const onError = (err) => {
      expect(err).toBe('dummy error');
    };
    dialogContext = new FrDialogContext(null, onError, null);
    dialogContext.error('dummy error');
  });

  it ('should execute onComplete', () => {
    const onComplete = () => {
      expect(true).toBeTruthy();
    };
    dialogContext = new FrDialogContext(null, null, onComplete);
    dialogContext.complete();
  });
});
