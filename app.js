// Função para configurar o alerta de preço
function setPriceAlert(cryptoId, targetPrice) {
  if (targetPrice && !isNaN(targetPrice)) {
    localStorage.setItem(cryptoId, targetPrice);
    alert('Alerta de preço configurado!');
  } else {
    alert('Preço inválido!');
  }
}

// Função para verificar alertas de preço periodicamente
async function checkPriceAlerts() {
  const cryptos = await fetchCryptos();
  cryptos.forEach(crypto => {
    const alertPrice = localStorage.getItem(crypto.id);
    if (alertPrice && crypto.current_price >= alertPrice) {
      new Notification(`${crypto.name} atingiu o preço desejado!`);
      localStorage.removeItem(crypto.id); // Remover após notificação
    }
  });
}

// Verificar os alertas a cada 1 minuto
setInterval(checkPriceAlerts, 60000);
