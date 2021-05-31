import state  from '../../state/state';
import { createErrorForm } from '../../utils';

const handleUploadImg = (target: HTMLElement): void => {
  if (!target.classList.contains('input-upload')) {
    return;
  }
  const form = target.closest('.form');
  if (form?.querySelector('.form__error')) {
    form.firstElementChild?.remove();
  }

  const input = target as HTMLInputElement;
  const formLabel = target.closest('.form__label');
  const file = input.files?.[0] as File;

  const twoMbInBytes = 2097152;
  if (file.size > twoMbInBytes) {
    const textErr = 'This image size more then 2 Mb';
    createErrorForm(textErr);
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (): void => {
    const imgSrc = reader.result as string;
    state.user.avatar = imgSrc;
    formLabel?.setAttribute('style', `background-image: url('${imgSrc}'); border-radius: 50%`)
  };
};

export default handleUploadImg;