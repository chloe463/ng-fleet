import { FrDialogContext } from './dialog.service';

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
    const onNext = (value: string) => {
      expect(value).toBe('dummy value');
    };
    const onError = () => {};
    const onComplete = () => {};
    dialogContext = new FrDialogContext(onNext, onError, onComplete);
    dialogContext.next('dummy value');
  });

  it ('should execute onError', () => {
    const onNext = () => {};
    const onError = (err: string) => {
      expect(err).toBe('dummy error');
    };
    const onComplete = () => {};
    dialogContext = new FrDialogContext(onNext, onError, onComplete);
    dialogContext.error('dummy error');
  });

  it ('should execute onComplete', () => {
    const onNext = () => {};
    const onError = () => {};
    const onComplete = () => {
      expect(true).toBeTruthy();
    };
    dialogContext = new FrDialogContext(onNext, onError, onComplete);
    dialogContext.complete();
  });
});
