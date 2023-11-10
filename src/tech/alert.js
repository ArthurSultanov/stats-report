export const showAlert = (message, alertType) => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${alertType} alert-dismissible fade show`;
  
    const closeButton = document.createElement('button');
    closeButton.className = 'btn-close';
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('data-bs-dismiss', 'alert');
    closeButton.setAttribute('aria-label', 'Close');
  
    alertDiv.innerHTML = `
      <strong>${message}</strong>
    `;
  
    alertDiv.appendChild(closeButton);
  
    document.getElementById('footer').appendChild(alertDiv);
  
    setTimeout(() => {
      alertDiv.remove();
    }, 2000);
  };