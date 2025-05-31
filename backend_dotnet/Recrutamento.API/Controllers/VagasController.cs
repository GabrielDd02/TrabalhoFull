using Microsoft.AspNetCore.Mvc;
using Recrutamento.Dominio.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Recrutamento.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VagasController : ControllerBase
    {
        // Simulação de armazenamento em memória - TORNADO PÚBLICO PARA ACESSO
        public static List<Vaga> _vagas = new List<Vaga>();
        private static int _nextId = 1;

        // GET: api/vagas
        [HttpGet]
        public ActionResult<IEnumerable<Vaga>> GetVagas()
        {
            return Ok(_vagas);
        }

        // GET: api/vagas/5
        [HttpGet("{id}")]
        public ActionResult<Vaga> GetVaga(int id)
        {
            var vaga = _vagas.FirstOrDefault(v => v.Id == id);
            if (vaga == null)
            {
                return NotFound();
            }
            return Ok(vaga);
        }

        // POST: api/vagas
        [HttpPost]
        public ActionResult<Vaga> PostVaga(Vaga vaga)
        {
             if (vaga == null || string.IsNullOrWhiteSpace(vaga.Titulo))
            {
                return BadRequest("Dados da vaga inválidos.");
            }
            vaga.Id = _nextId++;
            _vagas.Add(vaga);
            return CreatedAtAction(nameof(GetVaga), new { id = vaga.Id }, vaga);
        }

        // PUT: api/vagas/5
        [HttpPut("{id}")]
        public IActionResult PutVaga(int id, Vaga vaga)
        {
            if (id != vaga.Id || vaga == null)
            {
                return BadRequest();
            }

            var vagaExistente = _vagas.FirstOrDefault(v => v.Id == id);
            if (vagaExistente == null)
            {
                return NotFound();
            }

            vagaExistente.Titulo = vaga.Titulo;
            vagaExistente.Descricao = vaga.Descricao;
            // Atualize outras propriedades conforme necessário

            return NoContent(); // Retorna 204 No Content
        }

        // DELETE: api/vagas/5
        [HttpDelete("{id}")]
        public IActionResult DeleteVaga(int id)
        {
            var vaga = _vagas.FirstOrDefault(v => v.Id == id);
            if (vaga == null)
            {
                return NotFound();
            }

            _vagas.Remove(vaga);

            return NoContent(); // Retorna 204 No Content
        }
    }
}

