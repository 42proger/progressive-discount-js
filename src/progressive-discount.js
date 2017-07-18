document.addEventListener("DOMContentLoaded", function () {
  const maxValue = 10,            // Maximum counter value, %
    inactiveTimeout = 15,         // Threshold for inactivity, s
    discountStep = 0.01;          // Counter increase step

  let activeWindow = true,
    count = 0,
    value = parseFloat(sessionStorage.getItem("discountValue")) || 0;

  window.addEventListener("focus", () => activeWindow = true);
  window.addEventListener("blur", () => activeWindow = false);
  document.addEventListener("mousemove", () => count = 0);

  // Increase discount
  function incDiscount() {
    if (!activeWindow || count++ >= inactiveTimeout || value >= maxValue) return;

    value = Math.min(value + discountStep, maxValue);
    sessionStorage.setItem("discountValue", value);
    document.querySelector(".counter").textContent = value.toFixed(2).replace(".", ",") + "%";

    if (value === maxValue) document.querySelector(".popup-open").removeEventListener("click", openPopup);
  }

  setInterval(incDiscount, 1000); // Step time, ms

  // Popup
  function openPopup() {
    const popup = document.querySelector(".popup-fade");
    popup.style.display = "block";

    document.querySelector(".discount-size").textContent = value.toFixed(2) + "%";
    document.querySelector("#discount-field").value = value.toFixed(2) + "%";

    return false;
  }

  document.querySelector(".popup-open").addEventListener("click", openPopup);
  document.querySelector(".popup-fade").addEventListener("click", function (e) {
    if (e.target === this || e.target.classList.contains("popup-close")) this.style.display = "none";
  });
});
