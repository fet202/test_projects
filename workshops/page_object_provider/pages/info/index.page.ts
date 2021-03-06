import {Button, Text, TextArea, Select, Input, Checkbox} from '../../controls'
import {InfoFragment1, InfoFragment2} from './fragments'
interface InfoInterface {
  setInfo(): Promise<void>;
  getInfo(): Promise<void>;
  logInfo(): Promise<any>;
}


class InfoPage {

  fragment1: InfoFragment1
  fragment2: InfoFragment2

  input1: Input
  input2: Input
  input3: Input
  input4: Input
  input5: Input
  input6: Input

  button1: Button
  button2: Button
  button3: Button

  text: Text
  select: Select

  textarea: TextArea

  checkbox1: Checkbox
  checkbox2: Checkbox
  checkbox3: Checkbox
  checkbox4: Checkbox

  constructor() {
    this.fragment1 = new InfoFragment1()
    this.fragment2 = new InfoFragment2()

    this.input1 = new Input()
    this.input2 = new Input()
    this.input3 = new Input()
    this.input4 = new Input()
    this.input5 = new Input()
    this.input6 = new Input()

    this.button1 = new Button()
    this.button2 = new Button()
    this.button3 = new Button()

    this.text = new Text()
    this.select = new Select()
    this.textarea = new TextArea()

    this.checkbox1 = new Checkbox()
    this.checkbox2 = new Checkbox()
    this.checkbox3 = new Checkbox()
    this.checkbox4 = new Checkbox()
  }
}

export {
  InfoPage,
  InfoInterface
}