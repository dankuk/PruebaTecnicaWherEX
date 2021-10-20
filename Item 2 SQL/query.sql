/*Item 1*/

-- modo 1
SELECT * FROM persona AS p 
INNER JOIN vehiculo AS v ON v.persona_id = p.id
WHERE v.tipo = 1;

-- modo 2
SELECT * FROM persona, vehiculo
WHERE vehiculo.persona_id = persona.id AND vehiculo.tipo = 1;

/* Item 2 */

-- modo 1
SELECT empresa.nombre, persona.nombre, vehiculo.descripcion, vehiculo.tipo FROM persona, empresa, vehiculo
WHERE persona.empresa_id = empresa.id AND persona.id = vehiculo.persona_id;

-- modo 2
SELECT empresa.nombre, persona.nombre, vehiculo.descripcion, vehiculo.tipo 
FROM persona
INNER join empresa ON empresa.id = persona.empresa_id
INNER join vehiculo ON vehiculo.persona_id = persona.id;

/* Item 3 */

-- modo 1
SELECT persona.* FROM persona, empresa
WHERE empresa.id = persona.empresa_id
AND empresa.id = 3 AND persona.estado = 1;

-- modo 2
SELECT persona.* FROM persona
INNER JOIN empresa ON empresa.id = persona.empresa_id
WHERE persona.estado = 1 AND empresa.id = 3;

/* Item 4 */
SELECT p.id, p.nombre, p.estado
FROM persona AS p;

/* Item 5 */
SELECT e.*, p.*, v.* FROM persona AS p
INNER JOIN empresa AS e ON e.id = p.empresa_id
LEFT JOIN vehiculo AS v ON p.id = v.persona_id
ORDER BY e.id ASC , p.nombre ASC;

/* Item 6 */

-- (Mostrará a todos, tengan o no tengan auto)
SELECT e.nombre, p.nombre, v.descripcion 
FROM empresa AS e 
INNER JOIN persona AS p ON e.id = p.empresa_id
LEFT JOIN vehiculo AS v ON p.id = v.persona_id;

-- (Mostrará solo a los que tengan auto)
SELECT e.nombre, p.nombre, v.descripcion 
FROM empresa AS e 
INNER JOIN persona AS p ON e.id = p.empresa_id
INNER JOIN vehiculo AS v ON p.id = v.persona_id;



