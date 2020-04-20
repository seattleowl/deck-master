const anims = {
	animActive: true,

	death(monster, player, secondMonster = monster) {
		if (!this.animActive) return

		boardElmt.style.pointerEvents = "none"
		
		deathCount++
		if (deathCount >= 10 && !timerEnded) unlockHero("reaper")

		secondMonster.style.left = "-100px"
		secondMonster.style.top = "400px"
		secondMonster.style.transform = "rotate(-5deg)"

		monster.style.left = "-120px"
		monster.style.top = "400px"
		monster.style.transform = "rotate(-15deg)"

		undraggable(player)
		setTimeout(() => {
			player.style.left = "calc(50% - 64px)"
			player.style.top = "78%"
		}, 300);
		player.style.transition = "top 500ms, left 500ms, transform 400ms"
		player.querySelector(".current").innerText = 0
		health = 15

		deathText.style.opacity = 1
		deathText.querySelector("#monster-name").innerText = monster.querySelector(".name").innerText
		deathText.querySelector("#final-coins").innerHTML = score + " <span class='icon-coin'></span>"
		deathText.querySelector("#final-monsters").innerHTML = monsterPoints + " <span class='icon-skull'></span>"
		deathText.querySelector("#final-score").innerText = score * 10 + monsterPoints * 2
		deathText.querySelector("#save-name").innerText = localStorage.dm_name || "No Name"

		let cards = document.querySelectorAll(".card:not(.hero-card):not(.card-back)")
		cards.forEach(card => {
			if (card != monster && card != secondMonster) card.style.opacity = 0
		})
		setTimeout(() => {
			cards.forEach(card => {
				if (card != monster && card != secondMonster) card.remove()
			})
		}, 500)
	}
}

let scoreUploadBtn = document.getElementById("upload-score")
scoreUploadBtn.onclick = () => {
	if (!localStorage.dm_name) {
		scoreUploadBtn.innerHTML = "Please set your name to continue"
	} else {
		location.reload()
		uploadScore(score * 10 + monsterPoints * 2)
	}
}

let changeNameBtn = document.getElementById("change-name")
let newName = document.getElementById("new-name")
changeNameBtn.onclick = () => {
	localStorage.dm_name = newName.value
	newName.value = ""
}