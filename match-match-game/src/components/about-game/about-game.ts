import './about-game.scss';
import BaseComponent from "../base-component/base-component";
import Instruction from '../instruction/instruction';

const firstInstrText = 'Register new player in game.  <span class="default-settings">Email must be unique.</span>';
const secondInstrText = `Configure your game settings.<br>
 <span class="default-settings">Default settings</span>:
 category - fruits, difficulty - easy (18 cards).`;
const thirdInstrText = 'Start you new game! Remember card positions and match it before times up.';


export default class AboutGame extends BaseComponent {
  firstInstruction: Instruction;
  
  secondInstruction: Instruction;
  
  thirdInstruction: Instruction;

  constructor() {
    super('div', ['about']);

    this.firstInstruction = new Instruction('instruction-1', {text: firstInstrText, numOfInstr: 1});
    this.secondInstruction = new Instruction('instruction-2', {text: secondInstrText, numOfInstr: 2});
    this.thirdInstruction = new Instruction('instruction-3', {text: thirdInstrText, numOfInstr: 3});

    this.renderAbout();
  }
  
  renderAbout(): void {
    const first = this.firstInstruction.element;
    const second = this.secondInstruction.element;
    const third = this.thirdInstruction.element;
    this.element.append(first, second, third);
  }
}