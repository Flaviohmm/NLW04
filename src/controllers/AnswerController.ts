import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository"

class AnswerController {

    // http://localhost:3333/answers/1?u=47860c65-ae8b-4656-99d2-0cb6aada5651

    /**
     * 
     * Route Params => Parametros que compõe a rota
     * routes.get('/answers/:value')
     * 
     * Query Params => Busca, Paginação, não obrigatórios
     * ?
     * chave = valor
     */
    async execute(request: Request, response: Response) {
        const { value } = request.params
        const { u } = request.query

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        })

        if (!surveyUser) {
            return response.status(400).json({
                error: 'Survey User does not exists!'
            })
        }

        surveyUser.value = Number(value)

        await surveysUsersRepository.save(surveyUser)

        return response.json(surveyUser)
    }
}

export { AnswerController }