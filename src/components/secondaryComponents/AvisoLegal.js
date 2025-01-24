import React from 'react';
import './AvisoLegal.css';

function AvisoLegal() {
  return (
    <div className="aviso-legal">
      <h1>Aviso Legal</h1>
      <p>Bienvenido al Aviso Legal de nuestra página web. A continuación te proporcionamos la información sobre los términos y condiciones que rigen el uso de este sitio web.</p>

      <section className="aviso-seccion">
        <h2>Propiedad del Sitio</h2>
        <p>Este sitio web y sus contenidos son propiedad de "El último grupo". Todos los derechos reservados. El acceso y uso de este sitio web están sujetos a los siguientes términos y condiciones.</p>
      </section>

      <section className="aviso-seccion">
        <h2>Uso del Sitio</h2>
        <p>El usuario se compromete a utilizar el sitio web de acuerdo con la ley y las buenas costumbres, no realizando actividades ilegales o fraudulentas. El acceso al sitio es para fines personales y no comerciales, salvo en los casos expresamente autorizados.</p>
      </section>

      <section className="aviso-seccion">
        <h2>Protección de Datos</h2>
        <p>La protección de la privacidad de nuestros usuarios es muy importante para nosotros. Para más detalles, consulta nuestra política de privacidad. La información personal que proporcionas será tratada conforme a la legislación vigente.</p>
      </section>

      <section className="aviso-seccion">
        <h2>Responsabilidad</h2>
        <p>El último grupo no será responsable de los daños y perjuicios derivados del uso inapropiado del sitio web. El acceso y uso del mismo se realizan bajo la responsabilidad del usuario.</p>
      </section>

      <section className="aviso-seccion">
        <h2>Modificaciones</h2>
        <p>El último grupo se reserva el derecho de modificar, actualizar o suprimir el contenido de este Aviso Legal en cualquier momento y sin previo aviso. Te recomendamos revisar este apartado periódicamente.</p>
      </section>

      <section className="aviso-seccion">
        <h2>Jurisdicción</h2>
        <p>Este Aviso Legal se regirá por las leyes del país donde opera "El último grupo", y cualquier disputa se resolverá en los tribunales competentes de dicha jurisdicción.</p>
      </section>
    </div>
  );
}

export default AvisoLegal;
