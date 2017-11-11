const data = [
  {
    title: 'Simple reactjs application',
    body: 'Hay muchas variaciones de los pasajes de Lorem Ipsum disponibles,\
    pero la mayoría sufrió alteraciones en alguna manera, ya sea porque \
    se le agregó humor, o palabras aleatorias que no parecen ni un \
    poco creíbles. Si vas a utilizar un pasaje de Lorem Ipsum, \
    necesitás estar seguro de que no hay nada avergonzante escondido \
    en el medio del texto. \
    Todos los generadores de Lorem Ipsum que se encuentran en Internet \
    tienden a repetir trozos predefinidos cuando sea necesario',
    author: {
      id: 1,
      displayName: 'John Snow',
    },
    agree: 5,
    keywords: [{
        label: 'React',
        description: ' a Simple frontend libray for javscript.'
      },
      {
        label: 'Performance',
        description: ''
      },
      {
        label: 'Frontend',
        description: 'Performance will be the reliability, accuracy and speed of the execution of your code'
      }
    ],
    comments: [{
        createdAt: Date.now(),
        message: 'Estoy de acuerdo',
        author: {
          id: 3,
          displayName: 'Mike Wasousky'
        }
      },
      {
        createdAt: Date.now(),
        message: 'Me parece bien',
        author: {
          id: 1,
          displayName: 'Pedro el Mono',
        },
        replies: [ 
          {
            createdAt: Date.now(),
            message: 'Es imposible que sea como dices',
            author: {
              id: 4,
              displayName: 'Barney el Dinosaurio',
            }
          },
          {
            createdAt: Date.now(),
            message: 'Habias isto alguna vez semejante estupidez y no te quejaste?',
            author: {
              id: 3,
              displayName: 'He-man. Master del universe',
            }
          },
        ]
      }
    ]
  },
  {
    title: 'Simple reactjs application',
    body: 'Hay muchas variaciones de los pasajes de Lorem Ipsum disponibles,\
    pero la mayoría sufrió alteraciones en alguna manera, ya sea porque \
    se le agregó humor, o palabras aleatorias que no parecen ni un \
    poco creíbles. Si vas a utilizar un pasaje de Lorem Ipsum, \
    necesitás estar seguro de que no hay nada avergonzante escondido \
    en el medio del texto. \
    Todos los generadores de Lorem Ipsum que se encuentran en Internet \
    tienden a repetir trozos predefinidos cuando sea necesario',
    author: {
      id: 1,
      displayName: 'John Snow',
    },
    agree: 5,
    keywords: [{
        label: 'React',
      },
      {
        label: 'Performance',
      },
      {
        label: 'Frontend'
      }
    ],
    comments: [{
        createdAt: Date.now(),
        message: 'Estoy de acuerdo',
        author: {
          id: 3,
          displayName: 'Mike Wasousky'
        }
      },
      {
        createdAt: Date.now(),
        message: 'Me parece bien',
        author: {
          id: 1,
          displayName: 'Pedro el Mono',
        }
      },
      {
        createdAt: Date.now(),
        message: 'Es imposible que sea como dices',
        author: {
          id: 4,
          displayName: 'Barney el Dinosaurio',
        }
      },
      {
        createdAt: Date.now(),
        message: 'Habias isto alguna vez semejante estupidez y no te quejaste?',
        author: {
          id: 3,
          displayName: 'He-man. Master del universe',
        }
      },
    ]
  },
]

export default data;
