import './instruction.scss';
import BaseComponent from '../base-component/base-component';

type IstructionData = {
  text: string,
  numOfInstr: number,
};

export default class Instruction extends BaseComponent {
  constructor(imgName: string, {text, numOfInstr}: IstructionData) {
    super('section', ['instruction']);
    this.renderInstruction(imgName, { text, numOfInstr})
  }

  renderInstruction(imgName: string, {text, numOfInstr}: IstructionData): Instruction {
    const template = `
      <span class="instruction__num">${numOfInstr}</span>
      <p class="instruction__text">${text}</p>
      <img class="instruction__img" src="assets/icons/${imgName}.png"/>
    `;
    this.element.insertAdjacentHTML('afterbegin', template);
    return this;
  }

}