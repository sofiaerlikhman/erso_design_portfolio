(() => {
  const refs = {
    openModalBtnHeader: document.querySelector("[data-modal-open-header]"),
    openModalBtnHero: document.querySelector("[data-modal-open-hero]"),
    openModalBtnFooter: document.querySelector("[data-modal-open-footer]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
  };

  refs.openModalBtnHeader.addEventListener("click", toggleModal);
  refs.openModalBtnHero.addEventListener("click", toggleModal);
  refs.openModalBtnFooter.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  } )

  window.onclick = function(event) {
    if (event.target == refs.modal) {
      closeModal();
    }
  }

  function toggleModal() {
    document.body.classList.toggle("modal-open");
    refs.modal.classList.toggle("is-hidden");
  }

  function closeModal() {
    document.body.classList.remove('modal-open');
      refs.modal.classList.add('is-hidden');
  }
})();