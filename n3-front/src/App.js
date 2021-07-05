import XLSX from 'xlsx';
import './App.css';
import api from './api';
import React, { useEffect, useState } from 'react'

function App() {

  let listaRegistros = []

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (update === false) {
      adicionaEventos()
      setUpdate(true);
    }
  }, []);

  function adicionaEventos() {
    document.getElementById('upload').addEventListener('change', evento, false);
  }

  async function carregaLista() {
    const dados = await api.get('vinho/')
    if (dados.data.data && dados.data.data.length > 0) {
      listaRegistros = dados.data.data
      insereLinhasLista()
    }
  }

  var ExelPase = function () {
    this.parseExcel = async function (file) {
      var reader = new FileReader();
      reader.onload = async function (e) {
        var dados = e.target.result;
        var workbook = XLSX.read(dados, { type: 'binary' });

        workbook.SheetNames.forEach(async function (sheetName) {
          var linhaRegistro = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          var json = JSON.stringify(linhaRegistro);
          listaRegistros = linhaRegistro
          if (listaRegistros.length > 0) {
            listaRegistros.forEach(obj => {
              api.post('vinho', obj);
            })
          }
        })
      };
    };
  };

  async function limpaRegistrosETabela() {
    api.delete('vinho/all/')
    const element = document.getElementById('dados-lista')
    element.innerHTML = ''
  }

  async function evento(evt) {
    let arquivos = evt.target.files;
    let exelPase = new ExelPase();
    await exelPase.parseExcel(arquivos[0]);
  }

  async function insereLinhasLista() {
    limpaRegistrosETabela()
    for (let obj in listaRegistros) {
      adicionaLinha(obj);
    }
  }

  function adicionaLinha(obj) {
    const element = document.getElementById('dados-lista');
    if (element) {
      const linha = document.createElement('tr');
      linha.innerHTML = `
    <tr key=${obj.id}>
      <td>${obj.acidity}</td>
      <td>${obj.citric_acid}</td>
      <td>${obj.residual_sugar}</td>
      <td>${obj.ph}</td>
      <td>${obj.quality}</td>
      <td>
        <button type="button" onClick='${deletarRegistro(obj.id)}' class="btn btn-danger">Apagar</button>
        <button type="button" class="btn btn-primary">Editar</button>
      </td>
    </tr>`
    }
  }


  async function deletarRegistro(id) {
    await api.delete('vinho/', id);
  }

  return (
    <div className="App" onLoad={carregaLista()}>
      <h3>Wine</h3>
      <table class="table caption-top">
        <thead>
          <tr>
            <th scope="col">Acidity</th>
            <th scope="col">citric Acid</th>
            <th scope="col">Residual Sugar</th>
            <th scope="col">Ph</th>
            <th scope="col"> Quality </th>
          </tr>
        </thead>
        <tbody id="dados-lista">
        </tbody>
      </table>
      <button type="button" class="btn btn-success"><form enctype="multipart/form-data">
        <input id="upload" type="file" name="files[]" />
      </form></button>
      <button type="button" class="btn btn-secondary">Export CSV</button>


    </div>
  );
}

export default App;
