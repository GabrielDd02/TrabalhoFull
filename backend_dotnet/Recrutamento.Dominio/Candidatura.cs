using Recrutamento.Dominio.Entities;

namespace Recrutamento.Dominio.Entities
{
    public class Candidatura
    {
        public int Id { get; set; }
        public int CandidatoId { get; set; }
        public virtual Candidato? Candidato { get; set; }
        public int VagaId { get; set; }
        public virtual Vaga? Vaga { get; set; }
        public DateTime DataAplicacao { get; set; }
        // Adicione outras propriedades relevantes
    }
}
