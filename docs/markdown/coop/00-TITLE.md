<!-- .slide: class="transition"-->  

# Travail coopératif

##==##

<!-- .slide: -->

# Travail coopératif
<br/>

## Ansible Galaxy
Ansible-galaxy permet de recenser les rôles produits par la communauté.  
Les rôles sont des collections de tâches standardisées permettant de déployer de A à Z un middleware spécifique, par exemple : 
* Cassandra
* MariaDB
* Nginx
* keycloak
* Prometheus

Vous pouvez également développer vos propres rôles, les versionner sur git/gitlab/bitbucket et les réutiliser de la même manière que s’ils étaient enregistrés dans ansible-galaxy.

Ansible-Galaxy permet également à la communauté de rendre disponible des modules qui ne sont pas encore intégré à Ansible et, ainsi, étendre les fonctionnalités proposées.

##==##

<!-- .slide: -->

# Travail coopératif
<br/>

## Ansible Vault
Ansible Vault, au même titre que Hashicorp Vault, permet de chiffrer des secrets.

Cependant, étant intégré à ansible, le fonctionnement est bien plus simple car il n’y a pas besoin de déchiffrer les secrets avant de démarrer le playbook.

Au runtime de ansible, il suffit de préciser dans les options le fichier contenant le mot de passe et les secrets seront déchiffrés “en live”.

ansible-vault permet de chiffrer des fichiers entiers ou certaines parties plus sensible d’un fichier.

##==##

<!-- .slide: -->

# Travail coopératif
<br/>

## Ansible Tower
Ansible Tower est une console Web et une API REST pour opérationnaliser Ansible dans votre équipe, votre organisation et votre entreprise.  
Il est conçu pour être le centre de toutes vos tâches d'automatisation.

Ansible Tower est donc l’équivalent de la ligne de commande.
