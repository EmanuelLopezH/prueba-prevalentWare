# Proyecto Prueba PrevalentWare

Este proyecto está desarrollado en **Next.js** con autenticación vía **GitHub OAuth** y gestión de base de datos mediante **Prisma**.  

A continuación encontrarás los pasos necesarios para correrlo en local.

---

## 🚀 Requisitos previos

- Node.js >= 18  
- npm >= 9  
- Una base de datos configurada (ej: PostgreSQL)  
- Cuenta en GitHub para crear una aplicación OAuth  

---

## 📦 Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/EmanuelLopezH/prueba-prevalentWare.git
cd prueba-prevalentWare/prueba
```

2. Instalar dependencias:

```bash
npm install
```

---

## ⚙️ Configuración de variables de entorno

Crea un archivo **`.env`** en la raíz del proyecto con las siguientes claves:

```env
GITHUB_ID=tu_github_client_id
GITHUB_SECRET=tu_github_client_secret
DATABASE_URL=postgresql://user:password@localhost:5432/tu_basededatos
BETTER_AUTH_SECRET=una_clave_secreta_segura
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000/api/auth/
```

### 📌 Cómo obtener `GITHUB_ID` y `GITHUB_SECRET`
1. Ve a tu perfil de GitHub → **Settings** → **Developer settings** → **OAuth Apps**.  
2. Crea una nueva aplicación con los siguientes valores:  
   - **Homepage URL** → `http://localhost:3000`  
   - **Authorization callback URL** → `http://localhost:3000/api/auth/callback/github`  
3. Copia el `Client ID` y `Client Secret` que genera GitHub y pégalos en tu `.env`.

---

## 🗄️ Migraciones de la base de datos

Si usas **Prisma**, corre las migraciones para preparar la base de datos:

```bash
npx prisma migrate dev
```

Para explorar los datos:

```bash
npx prisma studio
```

---

## ▶️ Correr el proyecto en local

```bash
npm run dev
```

La aplicación estará disponible en:  
👉 [http://localhost:3000](http://localhost:3000)

---

## ✅ Scripts útiles

- `npm run dev` → inicia el servidor en modo desarrollo  
- `npm run build` → crea la build de producción  
- `npm run start` → corre la aplicación en producción  
- `npm run lint` → ejecuta el linter  
- `npm run test` → ejecuta las pruebas unitarias con Jest  

---

## 🔑 Notas adicionales

- Asegúrate de que tu base de datos esté corriendo antes de iniciar el proyecto.  
- Mantén tus claves `.env` en privado (no subirlas a GitHub).  
- Si modificas el esquema de Prisma, recuerda correr nuevamente `npx prisma migrate dev`.  

---

## 📝 Licencia

Este proyecto es únicamente para fines de prueba técnica.  
