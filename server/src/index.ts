import {Hono} from 'hono'
import {cors} from 'hono/cors'
import type {ApiResponse} from 'shared/dist'
import type {Course} from "shared/dist/types/course";

const app = new Hono()

app.use(cors())

app.get('/', (c) => {
    return c.text('Hello Hono!')
})

app.get('/hello', async (c) => {

    const data: ApiResponse = {
        message: "Bazinga!",
        success: true
    }

    return c.json(data, {status: 200})
})

app.get('/courses/:id', async (c) => {
    const id = c.req.param('id')
    const data: Course = {
        id: 1,
        name: "Gestor/Coordenador da Formação",
        coverUrl: "",
        startDate: new Date("2026-01-15"),
        endDate: new Date("2026-03-05"),
        time: "18:00 - 22:00",
        timeDescription: "Pós Laboral",
        duration: "50h",
        regime: "Online",
        location: "",
        description: "Os formadores são, atualmente, confrontados com a necessidade de assumir outro tipo de atividades para além da de formador, nomeadamente ao nível da gestão e coordenação de ações de formação o que exige a mobilização de um conjunto de competências técnicas, mas também sociais e relacionais, que implicam a aquisição de conhecimentos, capacidades e atitudes relacionadas com a conceção, planeamento, acompanhamento, gestão e avaliação de programas de formação. No contexto atual, os gestores de formação são os atores que “dão sentido” à formação, na medida em que estimulam a função crítica, desenvolvem dispositivos de formação e gerem as relações com o exterior (entidades, formandos, formadores, …). Certificado de Competências Pedagógicas de Especialização (CCPE) de Gestor/Coordenador de Formação.",
        audience: "A Formação Pedagógica Contínua de Formadores – Gestor/Coordenador de Formação é dirigida a indivíduos que pretendam adquirir o Certificado de Competências Pedagógicas de Especialização (CCPE) de Gestor/Coordenador de Formação para exercer atividades a nível da gestão, coordenação, acompanhamento, recrutamento e avaliação da formação presencial e/ou a distância.",
        requirements: "As condições de acesso à Formação Pedagógica Contínua de Formadores – Gestor/Coordenador de Formação exigem que os candidatos reúnam os seguintes requisitos:\nQualificação de nível superior;\nCertificado de Competências Pedagógicas (CCP) ou a exceção prevista no n.º 2 do artigo 2º da Portaria n.º 214/2011, de 30 de maio;\n100 horas, comprovadas, de experiência formativa enquanto Formador (independentemente do curso de formação);\nCompetências digitais, nomeadamente, processamento de texto (nível independente), criação de conteúdos (nível básico), comunicação (nível básico), resolução de problemas (nível básico) e segurança da informação (nível independente;\nExperiência profissional mínima de 3 anos.",
        project: "Formação de Formadores",
        price: "160,00€",
        benefits: "",
        goals: "Tendo em conta as finalidades expostas anteriormente, foram criadas condições para que, com esta formação os formandos possam:\nDistinguir as competências e funções do gestor/coordenador de formação em função dos contextos em que intervém;\nRealizar diagnósticos de necessidades de formação alinhados com as orientações estratégicas da entidade e com as políticas de formação políticas de formação das empresas/sectores/regiões;\nPlanear la formação com base nas necessidades identificadas das empresas/sectores/regiões;\nGerir e controlar financeiramente projetos de educação/formação;\nPromover e divulgar um plano/ação de formação;\nOrganizar, orientar, acompanhar e coordenar a formação e as equipas de trabalho;\nAdotar técnicas de gestão da formação, para administrar o dispositivo formativo da organização;\nGerir e coordenar ações de formação a distância;\nConhecer os modelos e orientações específicas para a qualidade da formação;\nDesenvolver um sistema de avaliação da formação que permita avaliar a qualidade, eficiência e eficácia do projeto formativo;\nImplementar sistemas de melhoria contínua da formação aplicando os métodos e as técnicas necessárias à otimização dos resultados das atividades de gestão e avaliação.",
        sponsorImgUrl: "",
        courseContent: "Nesta ação de formação, iremos apresentar um conjunto de conteúdos que proporcionarão aos formandos a oportunidade de adquirir competências essenciais para o seu desenvolvimento. Saiba aqui quais as temáticas que irão ser abordadas.",
        enrollment: "",
        hasDownloadButton: false
    }

    if (id == data.id.toString()){
        return c.json(data, {status: 200})
    }

    return c.json(null, {status: 200})
})

export default app
