
const validUsers = ['admin','user'];
const validPass = '1234';
const coffeePrices = {
  espresso:2.5, latte:3.0, cappuccino:3.5, americano:2.0, mocha:4.0
};

let currentRole = null;

window.onload = () => {
  const first = prompt("Is this your first visit to our coffee shop? (Yes/No)");
  if (!first || first.trim().toLowerCase() !== 'yes') {
    alert("To use the services, please log in.");
  }
  document.getElementById('login-card').classList.remove('hidden');
  document.getElementById('order-card').classList.add('hidden');
};

document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();
  const u = document.getElementById('username').value.trim().toLowerCase();
  const p = document.getElementById('password').value;
  if (validUsers.includes(u) && p === validPass) {
    currentRole = u;
    alert(`Welcome, ${currentRole} user.`);
    document.getElementById('login-card').classList.add('hidden');
    document.getElementById('order-card').classList.remove('hidden');
  } else {
    alert("Incorrect username or password.");
    document.querySelectorAll('#login-form input, #login-form button')
      .forEach(el => el.disabled = true);
  }
});

document.getElementById('order-form').addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('customerName').value.trim();
  const age = parseInt(document.getElementById('age').value,10);
  const coffee = document.getElementById('coffeeType').value;
  const quantity = parseInt(document.getElementById('quantity').value,10);
  const splitCount = parseInt(document.getElementById('splitCount').value,10);
  const tipPercent = parseInt(document.getElementById('tipPercent').value,10);

  if (isNaN(age) || age<1||age>120) {
    alert("Please enter a valid age (1–120)."); return;
  }
  if (isNaN(quantity)||quantity<1||quantity>10) {
    alert("Quantity must be between 1 and 10."); return;
  }
  if (isNaN(splitCount)||splitCount<1||splitCount>3) {
    alert("Split count must be between 1 and 3."); return;
  }

  const pricePer = coffeePrices[coffee];
  const total = pricePer * quantity;
  let discount = 0;
  if (age<18 || age>60) discount = total * 0.10;
  const afterDiscount = total - discount;
  const tip = afterDiscount * (tipPercent/100);
  const final = afterDiscount + tip;
  const perPerson = final / splitCount;

  const message =
    `Dear ${name},\n\n` +
    `Coffee Type: ${coffee}\n` +
    `Quantity: ${quantity} cups\n` +
    `Total Price: $${total.toFixed(2)}\n` +
    `Discount: $${discount.toFixed(2)}\n` +
    `Price After Discount: $${afterDiscount.toFixed(2)}\n` +
    `Tip (${tipPercent}%): $${tip.toFixed(2)}\n` +
    `Final Amount: $${final.toFixed(2)}\n` +
    `Per Person (${splitCount}): $${perPerson.toFixed(2)}\n\n` +
    `Your role: ${currentRole}`;

  alert(message);

  const resultDiv = document.getElementById('result');
  resultDiv.textContent = message;
  resultDiv.classList.remove('hidden');
});
