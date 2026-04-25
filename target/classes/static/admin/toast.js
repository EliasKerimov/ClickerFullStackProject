const toastFactory = (message, type = 'primary') => {
    const toastHTML = `
        <div class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>`;

    const container = document.getElementById('toast-container');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = toastHTML;
    const toastEl = tempDiv.firstElementChild;
    container.appendChild(toastEl);

    const toast = new bootstrap.Toast(toastEl);
    toast.show();

    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
};

function showErrorToast(message) {
    toastFactory(message, "danger")
}

function showPrimaryToast(message) {
    toastFactory(message)
}