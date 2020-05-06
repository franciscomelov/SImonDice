const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 7
const SCCORE = document.getElementById('score')



class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    setTimeout(() => {
      this.generarSecuencia()
      this.siguienteNivel()
    }, 1000)
  }

  inicializar() {
    SCCORE.innerHTML = `Nivel 1`;

    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.elejirColor = this.elejirColor.bind(this)
    this.toggleBtnEmpezar()
    this.nivel = 1
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde
    }
  }

  toggleBtnEmpezar() {
    if (btnEmpezar.classList.contains('hide')) {
      btnEmpezar.classList.remove('hide')
    } else {
      btnEmpezar.classList.add('hide')
    }


  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  siguienteNivel() {
    SCCORE.innerHTML = `Nivel ${this.nivel }`;
    
    this.subnivel = 0
    setTimeout(this.iluminarSecuencia(), 1000)
    this.agregarEventosClick()
  }

  transformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return 'celeste'
      case 1:
        return 'violeta'
      case 2:
        return 'naranja'
      case 3:
        return 'verde'
    }
  }

  transformarColorANumero(color) {
    switch (color) {
      case 'celeste':
        return 0
      case 'violeta':
        return 1
      case 'naranja':
        return 2
      case 'verde':
        return 3
    }
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), 1000 * i)
    }
  }

  iluminarColor(color) {
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 350)
  }

  apagarColor(color) {
    this.colores[color].classList.remove('light')
  }

  agregarEventosClick() {
    this.colores.celeste.addEventListener('click', this.elejirColor)
    this.colores.violeta.addEventListener('click', this.elejirColor)
    this.colores.naranja.addEventListener('click', this.elejirColor)
    this.colores.verde.addEventListener('click', this.elejirColor)
  }

  eliminarEventosClick() {
    this.colores.celeste.removeEventListener('click', this.elejirColor)
    this.colores.violeta.removeEventListener('click', this.elejirColor)
    this.colores.naranja.removeEventListener('click', this.elejirColor)
    this.colores.verde.removeEventListener('click', this.elejirColor)
  }

  elejirColor(ev) {
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorANumero(nombreColor)
    this.iluminarColor(nombreColor)
    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++
      if (this.subnivel === this.nivel) {
        this.nivel++
        this.eliminarEventosClick()
        if (this.nivel === (ULTIMO_NIVEL + 1)) {
          this.ganoElJuego()
        } else {
          setTimeout(this.siguienteNivel, 1500)
        }
      }
    } else {
      this.perdioElJuego()
    }
  }

  ganoElJuego() {
    swal('Felicidades', "Ganaste", 'success')
      .then(this.inicializar())
  }

  perdioElJuego() {
    swal('Lo sentimos', "Perdiste", 'error')
      .then(() => {
        this.eliminarEventosClick()
        this.inicializar()
      })
  }
}

function empezarJuego() {
  window.juego = new Juego()
}

