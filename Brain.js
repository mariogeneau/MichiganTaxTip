//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
class Brain {
  //¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
  getTaxes(the_amount, taxe_ratio) {
    const amount = Number(the_amount);
    const tax = Number(taxe_ratio);
    return amount * tax;
  }
  //¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
  getTaxesPlusAmount(the_amount, taxe_ratio) {
    const tax = this.getTaxes(the_amount, taxe_ratio);
    return (Number(the_amount) + tax).toFixed(2);
  }
  //¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
  getTip(the_amount, the_tip) {
    return Number((Number(the_amount) * Number(the_tip)).toFixed(2));
  }
  //¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
}
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
const brain = new Brain();
export default brain;
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬