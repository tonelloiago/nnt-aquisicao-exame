# Acolhimento de pacientes

O acolhimento varia conforme a origem do paciente. Cada origem utiliza um software específico:

- Paciente Interno (triagem realizada no HEO): utiliza o software AGHUSE.
- Paciente Externo (encaminhado pela Prefeitura de Porto Alegre ou Viamão): utiliza o software Gercon.

Os passos a seguir devem ser seguidos para todos os pacientes, independentemente da origem:

---

## 1. Preenchimento tabela de pacients

- Criar um ID sequencial, com base no último ID utilizado para o tipo de exame correspondente (último ID + 1).
- Preencher os seguintes campos obrigatórios:
  - ID
  - Nome Completo
  - Data de Nascimento
  - Origem (Triagem, Prefeitura POA, Prefeitura Viamão)

---

## 2. Preenchimento no software NNT

- Criar um novo registro
- Nos campos **Apelido** e **ID**, coloque o ID criado no passo anterior (tabela de pacientes)
- Prossiga para **[aquisição do exame](../aquisicao/aquisicao.md)**