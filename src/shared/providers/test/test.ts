import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../../interfaces/question.interface';

/*
  Generated class for the TestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TestProvider {

  private test: Array<Question>;
  constructor(public http: HttpClient) {
    console.log('Hello TestProvider Provider');

    this.test = [
      {
        question: 'A parte de los libros que te mandan en la escuela ¿con qué frecuencia lees?',
        category: 'Educacion',
        answers: [
          {description: 'Nunca', code: 1},
          {description: 'De vez en cuando', code: 2},
          {description: 'Siempre que tengo ocación', code: 3}
        ]
      },
      {
        question: '¿Qué haces cuando estás enfermo y te mandan tomar un medicamento?',
        category: 'Analisis',
        answers: [
          {description: 'Sencillamente lo tomo', code: 1},
          {description: 'Miro que contraindicaciones tiene', code: 2},
          {description: 'Leo el prospecto de arriba a abajo', code: 3}
        ]
      },
      {
        question: 'Tu nota media de matemáticas en la preparatoria fue de:',
        category: 'Analisis',
        answers: [
          {description: '5 a 6.9', code: 1},
          {description: '7 a 8.9', code: 2},
          {description: '9 a 10', code: 3}
        ]
      },
      {
        question: 'El trato con animales...',
        category: 'Biodiversidad',
        answers: [
          {description: 'Me es indiferente', code: 1},
          {description: 'Me resulta interesante', code: 2},
          {description: 'Me encanta', code: 3}
        ]
      },
      {
        question: 'De el 1 al 10, ¿con que soltura te desenvuelves con la computadora?',
        category: 'tecnologia',
        answers: [
          {description: '0 a 4', code: 1},
          {description: '5 a 8', code: 2},
          {description: '9 al 10', code: 3}
        ]
      },
      {
        question: '¿Estarías de acuerdo en trabajar en una revista de economía escribiendo artículos?',
        category: 'Economia',
        answers: [
          {description: 'Prefiria no tener que hacerlo', code: 1},
          {description: 'Si, me gustaría', code: 2},
          {description: 'Seria un trabajo muy gratificante', code: 3}
        ]
      },
      {
        question: '¿Te interesa saber cómo funcionan aparatos que usas a diario como el celular, la televisión o la computadora?',
        category: 'Tecnologia',
        answers: [
          {description: 'Nada', code: 1},
          {description: 'Algo', code: 2},
          {description: 'Mucho', code: 3}
        ]
      },
      {
        question: 'Cuando quieres comprarte algo:',
        category: 'Economia',
        answers: [
          {description: 'Pides el dinero a tus padres', code: 1},
          {description: 'Pides una parte del dinero a tus padres', code: 2},
          {description: 'Ahorras y lo compras cuando tengas todo el dinero', code: 3}
        ]
      },
      {
        question: 'En general ¿te gusta resolver problemas matemáticos?',
        category: 'Analisis',
        answers: [
          {description: 'Nada', code: 1},
          {description: 'Algo', code: 2},
          {description: 'Mucho', code: 3}
        ]
      },
      {
        question: 'El funcionamiento de la célula te parece:',
        category: 'Biodiversidad',
        answers: [
          {description: 'Indiferente', code: 1},
          {description: 'Interesante', code: 2},
          {description: 'Fascinante', code: 3}
        ]
      },
      {
        question: '¿Perteneces a alguna asociación de ayuda social?',
        category: 'Sociedad',
        answers: [
          {description: 'No entra en mis planes', code: 1},
          {description: 'Me gustaria mas adelante', code: 2},
          {description: 'Ya participo en una', code: 3}
        ]
      },
      {
        question: 'Los artículos de divulgación científica te parecen:',
        category: 'Analisis',
        answers: [
          {description: 'Aburridos', code: 1},
          {description: 'Entretenidos', code: 2},
          {description: 'Muy interesante', code: 3}
        ]
      },
      {
        question: 'En general ¿has obtenido buenas calificaciones en actividades de laboratorio?',
        category: 'Analisis',
        answers: [
          {description: 'Regulares', code: 1},
          {description: 'Buenas', code: 2},
          {description: 'Muy buenas', code: 3}
        ]
      },
      {
        question: '¿Te gustaría estudiar en profundidad un idioma?',
        category: 'Idiomas',
        answers: [
          {description: 'Me resulta aburrido', code: 1},
          {description: 'Es algo que tengo planeado hacer', code: 2},
          {description: 'Ya estoy haciendolo', code: 3}
        ]
      },
      {
        question: '¿Cómo te sientes cuando hablas en público?',
        category: 'Sociedad',
        answers: [
          {description: 'Incomodo', code: 1},
          {description: 'No tengo ningun inconveniente', code: 2},
          {description: 'Me encanta ser el centro de atencion', code: 3}
        ]
      },
      {
        question: '¿Tratas de entender el comportamiento de tus amigos cuando surge un problema?',
        category: 'Sociedad',
        answers: [
          {description: 'Es algo que no me preocupa', code: 1},
          {description: 'Muestro cierta empatía', code: 2},
          {description: 'Intento profundizar todo lo posible en el asunto', code: 3}
        ]
      },
      {
        question: 'Tu nota media de biología en la preparatoria fue de:',
        category: 'Biodiversidad',
        answers: [
          {description: '5 a 6.9', code: 1},
          {description: '7 a 8.9', code: 2},
          {description: '9 a 10', code: 3}
        ]
      },
      {
        question: '¿Te gusta la vida rural?',
        category: 'Biodiversidad',
        answers: [
          {description: 'No, deseo vivir siempre en la ciudad', code: 1},
          {description: 'No me importa pasar algunas temporadas en el campo', code: 2},
          {description: 'Es un estilo de vida que me encanta', code: 3}
        ]
      },
      {
        question: 'Si te hacen una extracción de sangre:',
        category: 'Salud',
        answers: [
          {description: 'Me mareo', code: 1},
          {description: 'Me siento tranquilo', code: 2},
          {description: 'Converso con la enfermera', code: 3}
        ]
      },
      {
        question: '¿Te consideras una persona creativa e imaginativa?',
        category: 'Arte',
        answers: [
          {description: 'Poco', code: 1},
          {description: 'Algo', code: 2},
          {description: 'Mucho', code: 3}
        ]
      },
      {
        question: '¿Tienes un registro personal de gastos?',
        category: 'Economia',
        answers: [
          {description: 'No lo necesito', code: 1},
          {description: 'Si, anoto las cosas importantes', code: 2},
          {description: 'Si, lo uso mucho', code: 3}
        ]
      },
      {
        question: 'Las técnicas de primeros auxilios...',
        category: 'Salud',
        answers: [
          {description: '...no tengo pensado aprenderlas', code: 1},
          {description: '...me parecen importantes', code: 2},
          {description: '...las conozco a la perfeccion', code: 3}
        ]
      },
      {
        question: 'Cuando un amigo no entiende algo:',
        category: 'Educacion',
        answers: [
          {description: 'Ignoro su problema', code: 1},
          {description: 'Trato de explicarle', code: 2},
          {description: 'Lo ayudo hasta que entiende perfectamente', code: 3}
        ]
      },
      {
        question: 'En comparación con gente de tu edad, destacas en música, creatividad u otra forma de arte.',
        category: 'Arte',
        answers: [
          {description: 'Nada', code: 1},
          {description: 'Algo', code: 2},
          {description: 'Mucho', code: 3}
        ]
      },
      {
        question: '¿Qué haces si sientes alguna dolencia?',
        category: 'Salud',
        answers: [
          {description: 'La ignoro', code: 1},
          {description: 'Voy al doctor en un plazo razonable', code: 2},
          {description: 'Me informo hacerca de este problema', code: 3}
        ]
      },
      {
        question: 'Cuando tienes que explicar algo a otra persona...',
        category: 'Educacion',
        answers: [
          {description: '...me desespero si no me entiende a la primera', code: 1},
          {description: '...trato de ser claro', code: 2},
          {description: '...se lo repito con calma las veces que haga falta', code: 3}
        ]
      },
      {
        question: '¿Con qué frecuencia visitas una exposición artística?',
        category: 'Arte',
        answers: [
          {description: 'Nunca', code: 1},
          {description: 'Cuando me parece interesante', code: 2},
          {description: 'Siempre que tengo ocación', code: 3}
        ]
      },
      {
        question: '¿Qué haces cuando se descompone algún electrodoméstico en casa?',
        category: 'Tecnologia',
        answers: [
          {description: 'Lo llevo al servicio tecnico', code: 1},
          {description: 'Trato de repararlo', code: 2},
          {description: 'Busco informacion hasta poder repararlo', code: 3}
        ]
      },
      {
        question: '¿Trabajarías en tus ratos libres como profesor particular?',
        category: 'Educacion',
        answers: [
          {description: 'Nunca lo haria', code: 1},
          {description: 'Lo haria si necesitara dinero', code: 2},
          {description: 'Sin duda alguna', code: 3}
        ]
      },
      {
        question: '¿Prefieres trabajar con máquinas o con personas?',
        category: 'Tecnologia',
        answers: [
          {description: 'Con personas, siempre', code: 1},
          {description: 'Me es indiferente', code: 2},
          {description: 'Con maquinas, siempre', code: 3}
        ]
      }
    ]
  }

  public getTest(): Array<Question> {
    return this.test;
  }

  public evaluateTest(test: Array<Question>) {
    let values = [];
    test.forEach(question => {
      const currentCategory = values.find(value => value.category === question.category);
      if(currentCategory) {
        currentCategory.value += question.answer;
      } else {
        values.push({category: question.category, value: question.answer});
      }
    });
    console.log(values.sort((a, b) => b.value - a.value));
  }

}
