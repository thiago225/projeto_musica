<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adicionar Música</title>
    <!-- Link para o CSS do Bootstrap -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <div class="container mt-5">
        <h2 class="mb-4">Adicionar Música</h2>
        <form action="" method="post" enctype="multipart/form-data">
            <div class="form-group">
                <label for="arquivoMusica">Escolha a música:</label>
                <input type="file" class="form-control-file" name="arquivoMusica" id="arquivoMusica" required>
            </div>
            
            <div class="form-group">
                <label for="displayName">Nome da Música:</label>
                <input type="text" class="form-control" name="displayName" id="displayName" placeholder="ex: The Charmer's Call">
            </div>
            
            <div class="form-group">
                <label for="arquivoImagem">Escolha a imagem da música:</label>
                <input type="file" class="form-control-file" name="arquivoImagem" id="arquivoImagem" required>
            </div>
            
            <div class="form-group">
                <label for="artist">Artista:</label>
                <input type="text" class="form-control" name="artist" id="artist" placeholder="ex: Hanu Dixit">
            </div>
            
            <button type="submit" class="btn btn-primary" name="botao">Enviar</button>
        </form>
    </div>

    <!-- Script JavaScript do Bootstrap -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>

</html>
