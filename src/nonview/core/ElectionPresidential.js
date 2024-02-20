import { Election } from ".";

export default class ElectionPresidential extends Election {
  getTypeName() {
    return "Presidential";
  }
}
