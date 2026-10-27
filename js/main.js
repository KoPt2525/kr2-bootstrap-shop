const orderModal = document.getElementById('orderModal');
const modalProductText = document.getElementById('orderModalProduct');
const modalProductSelect = document.getElementById('modal-product');
const successToast = document.getElementById('successToast');

if (orderModal) {
  orderModal.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    const productName = button ? button.dataset.product : '';

    modalProductText.textContent = productName ? `Вы заказываете: ${productName}` : '';
    modalProductText.hidden = !productName;

    if (productName) {
      const option = Array.from(modalProductSelect.options)
        .find((item) => item.text.startsWith(productName));

      if (option) {
        modalProductSelect.value = option.value;
      }
    }
  });
}

document.querySelectorAll('.needs-validation').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    form.reset();

    if (orderModal && orderModal.contains(form)) {
      bootstrap.Modal.getInstance(orderModal).hide();
    }

    if (successToast) {
      bootstrap.Toast.getOrCreateInstance(successToast).show();
    }
  });

  form.addEventListener('reset', () => {
    form.classList.remove('was-validated');
  });
});
