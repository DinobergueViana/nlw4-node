import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

/*
    como funciona o cálculo do NPS

    Notas: 1 2 3 4 5 6 7 8 9 10
    Detratores: notas de 0 - 6
    Passivos: notas de 7 - 8
    Promotores: notas de 9 - 10

    Fórmula: (numero de promotores - numero de detratores) / (total de respondentes) * 100

  */

class NpsController {
  async execute(req: Request, res: Response) {
    // recupera o id da pesquisa
    const { survey_id } = req.params;

    // 
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    // busca todas as respostas referentes ao id da pesquisa
    // cujo valor não seja nulo
    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull())
    });

    // filtrando as notas
    const detractors = surveysUsers.filter(
      (survey) => survey.value >= 0 && survey.value <= 6
    ).length;

    const promoters = surveysUsers.filter(
      (survey) => survey.value >= 9 && survey.value <= 10
    ).length;

    const passive = surveysUsers.filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length;

    // recupera o tatal de respostas
    const totalAnswers = surveysUsers.length;

    // realiza o calculo do nps
    const calc = Number(
      (((promoters - detractors) / totalAnswers) * 100).toFixed(2)
    );

    // retorna a informação para o cliente
    return res.json({
      detractors,
      promoters,
      passive,
      totalAnswers,
      nps: calc
    });
  }
}

export { NpsController }