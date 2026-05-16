# Screenshots

Os screenshots principais podem ser gerados automaticamente com:

```powershell
npm run screenshots
```

Antes de rodar o comando:

1. Ligue o MySQL pelo XAMPP.
2. Ligue o MongoDB.
3. Inicie o sistema em `http://localhost:3000`.
4. Confirme que o usuário `admin@admin.com` com senha `123456` existe no banco.

## Arquivos esperados

| Tela                       | Arquivo                                                     |
| -------------------------- | ----------------------------------------------------------- |
| Login                      | `docs/assets/screenshots/01-login.png`                      |
| Dashboard                  | `docs/assets/screenshots/02-dashboard.png`                  |
| Livros                     | `docs/assets/screenshots/03-livros.png`                     |
| Autores                    | `docs/assets/screenshots/04-autores.png`                    |
| Categorias                 | `docs/assets/screenshots/05-categorias.png`                 |
| Empréstimos                | `docs/assets/screenshots/06-emprestimos.png`                |
| Importação/exportação JSON | `docs/assets/screenshots/07-importacao-exportacao-json.png` |
| Logs XML                   | `docs/assets/screenshots/08-logs-xml.png`                   |
| Relatório PDF              | `docs/assets/screenshots/09-relatorio-pdf.png`              |

## MongoDB Compass

O print do MongoDB Compass deve ser feito manualmente, porque o Compass é um aplicativo desktop separado.

Passos:

1. Abra o MongoDB Compass.
2. Conecte em `mongodb://127.0.0.1:27017`.
3. Abra o banco `biblioteca_geek_logs`.
4. Abra a collection `logs`.
5. Tire o print e salve como:

```text
docs/assets/screenshots/10-mongodb-compass-logs.png
```

Se o Compass não estiver instalado, use `npm run check:mongo` como evidência textual de conexão e quantidade de logs.
