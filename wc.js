//to move between pages
function redirectToPage() {
    var selectedPage = document.getElementById("pageSelect").value;
    if (selectedPage) {
      window.location.href = selectedPage;
    }
  }; 

// Object for holding original page (players) values  
let originalHTML = {
  keepers: document.querySelector('.keepers').innerHTML,
  defenders: document.querySelector('.defenders').innerHTML,
  midfielders: document.querySelector('.midfielders').innerHTML,
  attackers: document.querySelector('.attackers').innerHTML,
};

 // Function to reset the original content (sort players by position)
function resetOriginalContent() {
  document.querySelector('.keepers').innerHTML = originalHTML.keepers;
  document.querySelector('.defenders').innerHTML = originalHTML.defenders;
  document.querySelector('.midfielders').innerHTML = originalHTML.midfielders;
  document.querySelector('.attackers').innerHTML = originalHTML.attackers;
  

  document.querySelector('.sortedgp').innerHTML = '';
  document.querySelector('.sortedgoals').innerHTML = '';
  document.querySelector('.sortedassists').innerHTML = '';
}

// Function to handle sorting by a given attribute
function sortPlayers(attribute) {
  resetOriginalContent(); // Ensure original content is reset before sorting

  document.querySelectorAll('.container h2').forEach(h2 => h2.remove());

  
  const players = document.querySelectorAll('.player');
  const playerCardsArray = Array.from(players);

  if (attribute === 'gp') {
    playerCardsArray.sort((a, b) => {
      const valueA = parseInt(a.querySelector(`.${attribute}`).textContent.trim()) || 0;
      const valueB = parseInt(b.querySelector(`.${attribute}`).textContent.trim()) || 0;
      return valueB - valueA; // Sort in descending order
    });

    // Append sorted players to the sorted container
    const sortedDiv = document.querySelector(`.sorted${attribute}`);
    playerCardsArray.forEach(player => sortedDiv.appendChild(player));
  } else {
    const keepers = playerCardsArray.filter(player => player.closest('.keepers'));
    const otherPlayers = playerCardsArray.filter(player => !player.closest('.keepers'));

    otherPlayers.sort((a, b) => {
      const valueA = parseInt(a.querySelector(`.${attribute}`).textContent.trim()) || 0;
      const valueB = parseInt(b.querySelector(`.${attribute}`).textContent.trim()) || 0;
      return valueB - valueA;
    });

    // Append sorted other players to the sorted container
    const sortedDiv = document.querySelector(`.sorted${attribute}`);
    otherPlayers.forEach(player => sortedDiv.appendChild(player));
    
    // Append keepers after other players
    keepers.forEach(player => sortedDiv.appendChild(player));
  }
}

document.getElementById('sortgp').addEventListener('change', () => sortPlayers('gp'));
document.getElementById('sortgoals').addEventListener('change', () => sortPlayers('goals'));
document.getElementById('sortassists').addEventListener('change', () => sortPlayers('assists'));

document.getElementById('reset').addEventListener('change', () => resetOriginalContent());  