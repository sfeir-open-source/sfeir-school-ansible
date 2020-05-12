<!-- .slide: class="transition bg-pink" -->

# Introduction

##==##

<!-- .slide: -->

# Introduction
<br/>

## L'historique
La plate-forme a été créée par Michael DeHaan.  
Parmi Les utilisateurs d'Ansible, on peut trouver (Pour ne citer que les plus connu):
* Hewlett-Packard Allemagne
* Airbus
* La Poste
* la Société générale. 

Notes:
Michael DeHaan, l'auteur de l'application serveur de provisionnement Cobbler.
Conséquence du rachat d'Ansible par RedHat, il est disponible à l'installation une fois le repository EPEL configuré sur les distributions RHEL, CentOS et Scientific Linux.
Carrefour fait également par grands utilisateurs.

##==##

<!-- .slide: --> 

# Introduction
<br/>

## La timeline

![h-400:center](./assets/images/timeline.png)

##==##

<!-- .slide: -->

# Introduction
<br/>

![h-400:float-left](./assets/images/ansible.png) 

<br/><br/><br/><br/>
Write and Deploy Configuration as Code

Notes:
En fait, Ansible tout comme Chef, Puppet ou SaltStack sont des outils de Configuration Management.

##==##

<!-- .slide: -->

# Introduction
<br/>

## Principaux avantages de la Config As Code
* Le déploiement de la configuration est entièrement automatisé : 
    * Moins d'erreurs humaines
    * Reproductibilité
    * Un seul référentiel pour déployer sur de nombreuses *machines*
* De nombreux modules : 
    * Les possibilités sont nombreuses,
    * Certains modules permettent de se passer de *Terraform* pour déployer sur le cloud

Notes:
Officiellement, Terraform ne propose pas de provisionner Ansible, par contre pour Puppet, SaltStack et Habitat/Chef, oui.
Cependant, la communauté en a développé un.

##==##

<!-- .slide: -->

# Introduction
<br/>

## Principaux avantages de la Config As Code
* Adoption des bonnes pratiques liées au monde du développement
    * Versionning
    * Documentation
    * Testing
    * Reproductibilité

